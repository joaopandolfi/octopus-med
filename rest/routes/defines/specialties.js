module.exports = function (app) {

	app = require('../especialties/cardio')(app);

	return app;
};