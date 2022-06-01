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

// app.get("/", function(req, res) {



const url = "https://api.openweathermap.org/data/2.5/weather?q=Agra,in&appid=f328047da69cf02de9d737ce3066d54d";

//     https.get(`https://api.openweathermap.org/data/2.5/weather?q=Agra,in&appid=f328047da69cf02de9d737ce3066d54d&units=metric`, (response) => {
//         response.on('data', (d) => {
//             const weatherData = JSON.parse(d);
//             const arrData = [weatherData];
//             const realTimeData = arrData.map((val) => replaceVal(homefile, val)).join("");

//             // response.sendFile(__dirname + "/HTML/index.html");

//             res.send(realTimeData);
//             console.log(weatherData);




//         }).on('error', (d) => {
//             res.end();
//         })
//     })
// })







// now target items to show data 
// const tempMax = $(".temp h3");
// const tempMin = $(".temp p");
// const weatherDescription = $(".weather-description");
// const pressure = $(".item1 p");
// const visibility = $(".item2 p");
// const humidity = $(".item3 p");
// console.log(tempMax, tempMin, weatherDescription, pressure, visibility, humidity);

// $(".weather-description").click(function() {
//     console.log("okay");
// });
let data = {};
https.get(url, (res) => {
    res.on('data', (d) => {
        data = JSON.parse(d);
        console.log(data);

        app.get("/", function(req, res) {
            res.render("index", { tempval: data.main.temp, tempmin: data.main.temp_min });
        })







    })
})
const orgran = "this is git test";