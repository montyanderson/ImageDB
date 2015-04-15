module.exports = function(app, server, db, config) {

	var url = require("url");

	var pageData = {
		title: config.name,
		port: config.port
	}

	app.get("/", function(req, res) {
		res.render("index", pageData);
	});
}