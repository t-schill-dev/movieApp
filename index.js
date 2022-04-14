const express = require("express"),
    morgan = require("morgan"),
    fs = require("fs"),
    path = require('path');

const app = express();

//create write stream (in append mode)
//a "log.txt" file is created
const accessLogStream = fs.createWriteStream(path.join(__dirname, "log.txt"), { flags: "a" });

//setup the logger
app.use(morgan("combined", { stream: accessLogStream }));

app.use(express.static(path.join(__dirname, "./public")));

//Server response when requesting
app.get("/", (req, res) => {
    res.send("Welcome to my app");
});

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send("Something does not work");
});

app.listen(8080, () => {
    console.log("Your app ist listening on port 8080");

});