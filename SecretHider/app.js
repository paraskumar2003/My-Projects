// require module
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");


// app configurations
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", 'ejs');
app.listen(3000, () => {
    console.log("Server started at port 3000");
})

// handling requests
app.get("/", (req, res) => {
    res.render("home")
})
app.get("/register", (req, res) => {
    res.render("register");
})