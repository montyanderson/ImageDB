var express = require("express");
var mongojs = require("mongojs")

var config = {
	name: "ImageDB",
	port: 3000
}

/* Generate Server */

var app = express();
var server = require("http").Server(app);
var ect = require("ect")({ watch: true, root: __dirname + '/views', ext: ".ect" });

/* App Settings */

app.set("view engine", "ect");
app.engine("ect", ect.render);

app.use(express.static("static"));

function startServer() {
    require("./router.js") (app, server, db, config);
	require("./sockets.js")(app, server, db, config);

	/* Start Server */
	server.listen(config.port);
	console.log("Running on port " + config.port);
}

/* Connect to Database */

var db = mongojs.connect(config.name, ["images"]);

db.images.isCapped(function(error, res) {
	if(res == undefined) {
		console.log("'images' isn't a capped collection... Creating one!");
		db.collection("images").drop();
		db.createCollection("images", {capped: true, size: 1*1000000, max: 250});
	}

	startServer();
});