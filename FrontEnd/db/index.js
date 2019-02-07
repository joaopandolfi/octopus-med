var r = require('rethinkdb')
var assert = require('assert')

// RethinkDB database settings. Defaults can be overridden using environment variables.
var dbConfig = {
    host: process.env.RDB_HOST || 'localhost',
    port: parseInt(process.env.RDB_PORT) || 28015,
    db: process.env.RDB_DB || 'chat',
    tables: {
        'messages': 'id',
        // 'users': 'id'
    }
}

module.exports.setup = function () {
    r.connect({ host: dbConfig.host, port: dbConfig.port }, function (err, connection) {
        assert.ok(err === null, err);
        r.dbCreate(dbConfig.db).run(connection, async function (err, result) {
            let tables = await r.db(dbConfig.db).tableList().run(connection)
            for (var tbl in dbConfig.tables) {
                (function (tableName) {
                    if (tables.indexOf(tableName) == -1) {
                        r.db(dbConfig.db).tableCreate(tableName, { primaryKey: dbConfig.tables[tbl] }).run(connection, function (err, result) {
                            if (err) {
                                console.error(`RethinkDB ${tableName} already exists.`, err);
                            }
                            else {
                                console.log(`RethinkDB ${tableName} created`);
                            }
                        });
                    }
                })(tbl);
            }
        });
    });
}

function onConnect(callback) {
    r.connect({ host: dbConfig.host, port: dbConfig.port }, function (err, connection) {
        assert.ok(err === null, err);
        connection['_id'] = Math.floor(Math.random() * 10001);
        callback(err, connection);
    });
}

module.exports.saveMessage = function (msg, room, callback) {
    onConnect(function (err, connection) {
        if (room) {
            let tableName = `messages_${room}`
            r.db(dbConfig['db']).table(tableName).insert(msg).run(connection, function (err, result) {
                if (err) {
                    console.error(connection['_id'], err.name, err.msg, err.message);
                    callback(err);
                }
                else {
                    if (result.inserted === 1) callback(null, true);
                    else callback(null, false);
                }
                connection.close();
            });
        }
        else connection.close();
    });
};

module.exports.findMessages = function (room, callback) {
    onConnect(async function (err, connection) {
        let tableName = `messages_${room}`
        let tableExists = await r.db('chat').tableList().contains(tableName).run(connection)
        if (!tableExists) await r.db(dbConfig.db).tableCreate(tableName).run(connection)
        r.db(dbConfig['db']).table(tableName).orderBy('timestamp').run(connection, function (err, cursor) {
            if (err) {
                console.error(connection['_id'], err.name, err.msg, err.message);
                callback(null, []);
                connection.close();
            }
            else {
                cursor.toArray(function (err, results) {
                    if (err) {
                        console.error(connection['_id'], err.name, err.msg, err.message);
                        callback(null, []);
                    }
                    else {
                        callback(null, results);
                    }
                    connection.close();
                });
            }
        });
    });
};
