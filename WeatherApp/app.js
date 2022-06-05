const express = require("express");
const app = express();
const bodyParser = require("body-parser");


app.set("view engine", 'ejs');
app.use(express.static("public"));
app.listen(3000, function() {});
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.render("index")
})