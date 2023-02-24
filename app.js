const express = require("express");

const app = express();
const jsonParser = express.json();

app.use(express.static(__dirname + "/wwwroot"));

app.get("/email/confirm:userId&emailToken", function(request, response) {
	const userId = request.params["userId"];
	const emailToken = request.params["emailToken"];
	const userIp = request.query.ip;
	const userPlatform = request.query.platform;
	response.sendFile(__dirname + "/view/email/confirm.html");
});

app.get("/", function(request, response) {
	response.sendFile(__dirname + "/index.html");
});

app.listen(3000);