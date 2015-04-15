module.exports = function(app, server, db, config) {
	var io = require("socket.io")(server);

	io.on("connection", function(socket) {
		var cursor = db.images.find({}, {}, {tailable: true, timeout: false});

		cursor.on("data", function(doc) {
			socket.emit("image", doc);
		});

		socket.on("submit", function(data) {
			console.log("submit: " + data);
			db.images.save({url: data});
		});
	});
}