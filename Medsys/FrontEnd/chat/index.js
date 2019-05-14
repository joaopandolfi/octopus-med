let db = require('../db')

// CHEATSHEET
// https://socket.io/docs/emit-cheatsheet/

//everyone
// io.sockets.emit(..)

//yourself
// socket.emit(..)

//others
// socket.broadcast.emit(..)

module.exports = (io) => {
    var usersonline = []
    var rooms = []
    const getRoomIndex = (room) => {
        return rooms.findIndex(val => {
            if (val.name == room) return true
        })
    }
    const sendNotification = (notification, socket) => {
        socket.broadcast.emit('notification', notification)
    }


    io.sockets.on('connection', function (socket) {
        var connected_user = ''
        var room = ''
        // var i = setInterval(function () {
        //     socket.emit('whoshere', {  'users': usersonline });
        // }, 3000);


        socket.on('iamhere', function (data) {
            connected_user = data.username

            if (data.room) {
                room = data.room
                let users = []
                // Check if room exists
                let i = getRoomIndex(room)
                if (i == -1) {
                    let data = {
                        name: room,
                        users: [connected_user]
                    }
                    rooms.push(data)
                    users = [connected_user]
                }
                else {
                    rooms[i].users.push(connected_user)
                    users = rooms[i].users
                }
                socket.join(room)
                io.in(room).emit('whoshere', { users })

                // var msg = {
                //     message: `<em>${connected_user} entrou na sala.</em>`,
                //     from: 'System',
                //     timestamp: new Date().getTime()
                // }
                // socket.to(room).emit('new message', msg)

                db.findMessages(room, function (err, messages) {
                    if (!err && messages.length > 0) {
                        socket.emit('history', messages);
                    }
                })

                // let notification = {
                //     timestamp: new Date().toLocaleTimeString(),
                //     interventionId: room,
                //     message: `${connected_user} entrou na sala.`

                // }
                // sendNotification(notification, socket)
            }
            // else{
            //     let notification = {
            //         timestamp: new Date().toLocaleTimeString(),
            //         interventionId: false,
            //         message: `${connected_user} entrou no lobby.`

            //     }
            //     sendNotification(notification, socket)
            // }

            usersonline.push(data)
        })

        socket.on('message', function (data) {
            if (!connected_user) {
                // socket.emit('new message', { message: '<em>You must log in before chatting. That\'s the rule</em>' })
                return
            }
            var msg = {
                message: data.message,
                from: connected_user,
                timestamp: new Date().getTime()
            }
            // Send to everyone
            io.in(room).emit('new message', msg)
            // io.sockets.emit('new message', msg)

            // Save on db
            db.saveMessage(msg, room, function (err, saved) {
                if (err || !saved) {
                    console.error('Error on inserting msg to db')
                    return;
                }
                else {
                    let notification = {
                        timestamp: new Date().toLocaleTimeString(),
                        interventionId: room,
                        message: `${connected_user} enviou uma mensagem.`
                    }
                    sendNotification(notification, socket)
                }
            })
        });

        socket.on('disconnect', function () {
            if (connected_user) {
                // Lista geral
                let i = usersonline.indexOf(connected_user)
                usersonline.splice(i, 1)

                // Lista da sala
                if (room) {
                    i = getRoomIndex(room)
                    let j = rooms[i].users.indexOf(connected_user)
                    rooms[i].users.splice(j, 1)

                    users = rooms[i].users
                    io.in(room).emit('whoshere', { users })

                    let notification = {
                        timestamp: new Date().toLocaleTimeString(),
                        interventionId: room,
                        message: `${connected_user} saiu da sala.`
                    }
                    sendNotification(notification, socket)

                    var msg = {
                        message: `<em>${connected_user} left.</em>`,
                        from: 'System',
                        timestamp: new Date().getTime()
                    }
                    io.in(room).emit('new message', msg)
                }
                // io.sockets.emit('whoshere', { 'users': usersonline });

                // socket.broadcast.emit('new message', msg);
            }
        })
    })
}