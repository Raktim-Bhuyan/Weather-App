const { log } = require("console");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https"); //make get request to external server from node server
//We don't need to install anything for it as it is a native node module , other 4 are external modules

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});
app.use(bodyParser.urlencoded({extended:true}));

app.post("/",function(req,res){
    //console.log(req.body.cityName);
    const query = req.body.cityName;
    const apiKey = "";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=7d7c14d0073f5a8f653ae4e56e33adfc&units=metric";
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            //console.log(data); returns data in hexadecimal code .To convert it into text of json format 
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
            
            //console.log(weatherData);
            console.log(weatherDescription);
            //temp is a string or text
            res.write("<p>The weather is currently "+ weatherDescription+"</p>");//have to add a block element tag for new line
            res.write("<h1>The temperature in "+query+" is" +temp+" degree celsius</h1>");
            //or copy path from JSON Viewer Awesome
            res.write("<img src ="+ imageURL+">");
            res.send();
        });
    });
    
    //res.send("Server is up and running");

});

app.listen(3000,function(){
    console.log("Server is running is at port 3000");
});

// const url = "https://api.openweathermap.org/data/2.5/weather?q=Tezpur&appid=7d7c14d0073f5a8f653ae4e56e33adfc&units=metric";
//     https.get(url,function(response){
//         console.log(response.statusCode);
//         response.on("data",function(data){
//             //console.log(data); returns data in hexadecimal code .To convert it into text of json format 
//             const weatherData = JSON.parse(data);
//             const temp = weatherData.main.temp;
//             const weatherDescription = weatherData.weather[0].description;
//             const icon = weatherData.weather[0].icon;
//             const imageURL = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
            
//             //console.log(weatherData);
//             console.log(weatherDescription);
//             //temp is a string or text
//             res.write("<p>The weather is currently "+ weatherDescription+"</p>");//have to add a block element tag for new line
//             res.write("<h1>The temperature in Tezpur is "+temp+" degree celsius</h1>");
//             //or copy path from JSON Viewer Awesome
//             res.write("<img src ="+ imageURL+">");
//             res.send();
//         });
//     });
    
//     //res.send("Server is up and running");