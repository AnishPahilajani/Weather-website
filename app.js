const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    var place = req.body.place; // getting data form html rememnber to consoloe log in app.post
    const url = "https://api.openweathermap.org/data/2.5/weather?appid=d47decd96e516e3f2f8a4cfde9a4cc46&units=metric&q=" + place;
    https.get(url, function (response) {
        //console.log(response);
        response.on("data", function (data) {
            var weatherData = JSON.parse(data);
            //console.log(weatherData);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            var picurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1>The Temperatue in "+ place+" is: " + temp + " degrees Celcius</h1>");
            res.write("<p>the weather description is: " + description + "</p>");
            res.write("<img src = " + picurl + " alt = 'emoji'>");
            res.send();
        });
    });
})











app.listen(3000, function(){
    console.log("Server is running on port 3000");
});