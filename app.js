//jshint esversion:6

//modules that to be installed by hyper
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

//using these installed modules
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    
    //getting input from the user ->refer html input form "post"
    const city = req.body.cityName;
    const appKey = "a4bb28092b65cd78f0536ae94f1a3a57";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?appid="+appKey+"&q="+city+"&units="+unit;
    
    https.get(url, function(response){
        console.log(response.statusCode);
    
        response.on("data", function(data){

            //getting data from the openweathermap website by our appid
            const weatherData = JSON.parse(data);
            //procedure for getting that id from the website
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const iconUrl = "https://openweathermap.org/img/wn/" + icon +"@2x.png";

            res.write("<h1>The temperature in " + city + " is " + temp + " degree celsius</h1>");
            res.write("<h3>The weather is currently " +  weatherDescription + "</h3>");
            res.write("<img src=" + iconUrl + ">");
            res.send();
        });
    });  
    //can send only res.send
    // res.send("Server is up and set");
});

app.listen(3000, function(){
    console.log("Server is running on port:3000.");
});