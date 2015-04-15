var socket = io('http://localhost:' + port);

$(document).ready(function() {
	
	socket.on("image", function(data) {
		console.log(data);
		var $image = $("<img />").attr("src", data.url);
		var imgHTML = $("<div></div>").append($image).html();

		$("#images").html(imgHTML + $("#images").html());
	});

	socket.on("err", function(error) {
		alert(error);
	});

	$("#upload").click(function() {
		console.log("data");
		socket.emit("submit", $("#url").val());
	});

});