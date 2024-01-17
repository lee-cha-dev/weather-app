if (process.env.NODE_END !== 'production') {
    require('dotenv').config();
}

const API_KEY = process.env["API_KEY"]
console.log(API_KEY);

// NODEJS REQUIRE PACKAGES HERE
const express = require('express');
const port = "8080";
const path = require("path");
const axios = require('axios');
const bodyParser = require("body-parser");

// INIT APP
const app = express();

// SET THE SOURCE DIRECTORY
app.use(express.static("src"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
})

// DATA CALLS
app.get('/data', (req, res) => {
    const user = {
        name: "Test Data",
        age: "99",
        title: "Web Developer"
    };
    res.json(user);
});

app.post('/weather-data', (req, res) => {
    console.log("Zip: " + req.body.zip);

    let weatherUrlLatLon = `https://api.openweathermap.org/geo/1.0/zip?zip=${req.body.zip}&appid=${API_KEY}`;
    let data = { data: "No Data For You" };
    console.log(`Request Weather data about ${req.body.zip} from URL:\n${weatherUrlLatLon}`);

    // return fetchTest(weatherUrlLatLon);
    // INITIAL CALL FOR LATITUDE AND LONGITUDE
    axios({
        url: weatherUrlLatLon,
        responseType: 'json'
    }).then(res1 => {
        // console.log(res1.data);
        data.zipData = res1.data;

        let weatherUrl =
            `https://api.openweathermap.org/data/2.5/weather?lat=${res1.data.lat}&lon=${res1.data.lon}&appid=${API_KEY}&units=imperial`;
        let weatherForecastUrl =
            `https://api.openweathermap.org/data/2.5/onecall?lat=${res1.data.lat}&lon=${res1.data.lon}&exclude=current,minutely,hourly,alerts&appid=${API_KEY}&units=imperial`;

        // SECOND CALL FOR THE WEATHER DATA
        axios({
            url: weatherUrl,
            responseType: 'json'
        }).then(res2 => {
            // console.log(res2.data);
            data.weatherData = res2.data;

            // THIRD/LAST CALL FOR FORECAST DATA
            axios({
                url: weatherForecastUrl,
                responseType: 'json'
            }).then(res3 => {
                // console.log(res3.data);
                data.forecastData = res3.data;
                console.log(`Sending weather data for ${req.body.zip} to Client now.`)
                // THIS IS THE LAST CALL - SEND DATA BACK FROM THE RES (NOT RES1, RES2, OR RES3)
                res.send(JSON.stringify(data));
            }).catch(error => {
                console.log(`ForecastUrl::Error::${error}`);
                res.send(error);
            });
        }).catch(error => {
            console.log(`WeatherUrl::Error::${error}`);
            res.send(error);
        })
    }).catch(error => {
        console.log(`WeatherUrlLatLon::Error::${error}`);
        res.send(`WeatherUrlLatLon::Error::${error}`);
    });
});

// SERVER LISTENING ON PORT 8080
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
