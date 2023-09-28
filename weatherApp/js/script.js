
const date = new Date();
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const dayOfWeek = daysOfWeek[date.getDay()];
const monthName = months[date.getMonth()];
const dayOfMonth = date.getDate();
const year = date.getFullYear();

const formattedDate = `${dayOfWeek}, ${monthName} ${dayOfMonth}, ${year}`;

var myHeading = document.getElementById("formattedDate");
myHeading.textContent = formattedDate;

$(document).ready(function () {
    $("#GetWeatherInfo").click(function () {
        var city = $("#city").val();
        var key = '21d6a10d7253f6ef07481815c779501c';


        $.ajax({
            url: 'http://api.openweathermap.org/data/2.5/weather',
            dataType: 'json',
            type: 'GET',
            data: { q: city, appid: key },

            success: function (data) {
                var temperature = Math.round(data.main.temp);
                var celcious = temperature - 273;
                var humidity = data.main.humidity;
                var weathercondition = data.weather[0].main;
                var description = data.weather[0].description;
                var windSpeed = (data.wind.speed * 3.6).toFixed(1);


                var sunriseTimestamp = data.sys.sunrise * 1000;
                var sunsetTimestamp = data.sys.sunset * 1000;
                var sunriseDate = new Date(sunriseTimestamp);
                var sunsetDate = new Date(sunsetTimestamp);
                var sunriseTime = sunriseDate.toLocaleTimeString(([], { hour: '2-digit', minute: '2-digit' }));
                var sunsetTime = sunsetDate.toLocaleTimeString(([], { hour: '2-digit', minute: '2-digit' }));

                var temperatureUnit = $("#temperatureUnit").val();
                var temperature;
                if (temperatureUnit === "Celsius") {
                    temperature = celcious + "°C ";
                } else if (temperatureUnit === "Fahrenheit") {
                    temperature = (celcious * 9 / 5 + 32).toFixed(2) + "°F";
                }



                var output = document.getElementById("cityName");
                output.textContent = city;
                var output1 = document.getElementById("cityTemp");
                output1.textContent = temperature;
                var output2 = document.getElementById("humidity");
                output2.textContent = "humidity: " + humidity + "%";
                var output3 = document.getElementById("weathercondition");
                output3.textContent = weathercondition;
                var output4 = document.getElementById("description");
                output4.textContent = "description: " + description;
                var output5 = document.getElementById("windSpeed");
                output5.textContent = "Wind Speed: " + windSpeed + " km/hr";
                var output6 = document.getElementById("sunrise");
                output6.textContent = sunriseTime;
                var output7 = document.getElementById("sunset");
                output7.textContent = sunsetTime;



            },
            error: function () {
                var myHeading = document.getElementById("cityName");
                myHeading.textContent = "Please Enter a Valid City Name";
                var myHeading = document.getElementById("cityTemp");
                myHeading.textContent = "";
                var myHeading = document.getElementById("humidity");
                myHeading.textContent = "---";
                var myHeading = document.getElementById("weathercondition");
                myHeading.textContent = "---";
                var myHeading = document.getElementById("description");
                myHeading.textContent = "---";
                var myHeading = document.getElementById("windSpeed");
                myHeading.textContent = "---";
                var myHeading = document.getElementById("sunrise");
                myHeading.textContent = "";
                var myHeading = document.getElementById("sunset");
                myHeading.textContent = "";
            }
        });
    });
});