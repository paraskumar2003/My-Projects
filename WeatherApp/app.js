const express = require("express");
const fs = require("fs");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");


app.set("view engine", 'ejs');
app.use(express.static("public"));
app.listen(3000, function() {});
app.use(bodyParser.urlencoded({ extended: true }));

const replaceVal = (tempval, orgval) => {
    let temperature = tempval.replace("{tempval}", orgval.main.temp);
    temperature = temperature.replace("{tempmin}", orgval.main.temp_min);
    temperature = temperature.replace("{weather-desc}", orgval.weather[0].description);
    temperature = temperature.replace("{pressure}", orgval.main.pressure);
    temperature = temperature.replace("{visibility}", orgval.visibility / 1000);
    temperature = temperature.replace("{humidity}", orgval.main.humidity);
    return temperature;
}
app.get("/", (req, res) => {
    res.render("index")
})