const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(express.static("public"));
app.listen(3000, function() {
    console.log("server created");
})
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/HTML/index.html")
})

const url = "https://api.openweathermap.org/data/2.5/weather?q=Agra,in&appid=f328047da69cf02de9d737ce3066d54d";

https.get(`https://api.openweathermap.org/data/2.5/weather?q=Agra,in&appid=f328047da69cf02de9d737ce3066d54d`, (response) => {
    response.on('data', (d) => {
        const weatherData = JSON.parse(d);
        console.log(weatherData);

    }).on('error', (d) => {
        response.send(`<h1>404 not found</h1>`);
    })
})


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