const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.cityName;
  const apiKey = "appkey";
  const unit = "metric";
  const url ="https://api.openweathermap.org/data/2.5/weather?q=" +query +"&appid=" +apiKey +"&units=" +unit;

  https.get(url, function (response) {

    response.on("data", function (data) {
      const wethersData = JSON.parse(data);
      const temp = wethersData.main.temp;
      const weatherDiscription = wethersData.weather[0].description;
      const icon = wethersData.weather[0].icon;
      const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<p>The wether is currently " + weatherDiscription + "<p>");
      res.write(
        "<h1>The temperature in London is " + temp + " degree Celcius.</h1>"
      );
      res.write("<img src=" + imageURL + ">");
      res.send();
      console.log("Post request Received");
    });
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000.");
});
