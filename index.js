const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const socket = require("socket.io");
const socketController = require("./src/socket/index");
const userRouter = require("./src/router/user.routes");

const http = require("http");
require("dotenv").config();

const app = express();

app.use(express.static("public"));
app.use(
	cors({
		origin: "*",
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
		preflightContinue: false,
		optionsSuccessStatus: 200,
	})
);
app.use(bodyParser.json());
app.use(userRouter);

const server = http.createServer(app);
const io = socket(server, {
	cors: {
		origin: "*",
	},
});

io.on("connection", (socket) => {
	console.log("new user connect");
	socketController(io, socket);
});

const APP_PORT = process.env.PORT || 4010;

server.listen(APP_PORT, () => {
	console.log("listening on port " + APP_PORT);
});
