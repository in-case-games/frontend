const express = require("express");

const app = express();
const jsonParser = express.json();

app.use(express.static(__dirname + "/wwwroot"));

app.get("/", function(request, response) {
	response.sendFile(__dirname + "/index.html");
});

app.listen(3000);