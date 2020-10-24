
//variables for storing API key, city name, targeing search button and storying recentCity array
var APIkey="5a883a61d18cd984e2119b354bc5db24";
var cityName = $("#city-search");
var searchBtn = $(".search")
var recentCity = [];
 
//function for 5 day weather
  function getFiveDay(cityName){
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+cityName.val()+ "&units=imperial&appid=" +APIkey;
    console.log(queryURL);
 
    $.ajax({
        url: queryURL,
        method: "GET"
  })
    .then(function(response) {
        console.log(response);
        $(".fiveDay").empty();
       
        for (var i=0; i < 5; i++){
        var d1=$("<div>");
        var d2=$("<div>");
        d1.attr("class","card");
        d2.attr("class","card-body");

        var temp=$("<p>");
        var hum= $("<p>");
        var date=$("<p>");
        date.text(moment(response.list[i*8].dt_txt).format("L"))
        temp.html("Current Temp: " + response.list[i*8].main.temp + " °F");
        hum.html("Humidity: " + response.list[i*8].main.humidity + "%");

        d2.append(date);
        d2.append(temp);
        d2.append(hum);

        d1.append(d2)
        $(".fiveDay").append(d1);
        } 
    })
}

//function for 1 day weather
function getOneDay(cityName){
    var oneDay = "https://api.openweathermap.org/data/2.5/weather?q="+cityName.val()+"&appid="+APIkey;
    console.log(oneDay);
        var date=$(".current-date").text(moment().format("l"));
        var city=$(".city");
        var conditions=$("condition");
        $("current-date").append(date);
        $(".city").append(city);
        $(".condition").append(conditions);
    
    $.ajax({
        url: oneDay,
        method: "GET"
  })
    .then(function(onedayobj) {
        console.log(onedayobj);
        var lon=(onedayobj.coord.lon);
        var lat=(onedayobj.coord.lat);
        var uvURL="http://api.openweathermap.org/data/2.5/uvi?lat="+lat+"&lon="+lon + "&appid=" +APIkey;
        console.log(uvURL)

        $.ajax({
            url: uvURL,
            method: "GET"
      })
        .then(function(uvObj) {
            console.log(uvObj)
            console.log(uvObj.value)
        })
    })
}

// Function for displaying buttons
function renderButtons() {
    $(".city-list").empty();
    for (var i = 0; i < recentCity.length; i++) {
        var a = $("<button>");
        a.addClass("city-btn");
        a.attr("data-name", recentCity[i]);
        a.text(recentCity[i]);
        $(".city-list").append(a);
        }
      }

// This function handles events where a search button is clicked
$(document).ready(function() {
    $(".search").on("click", function(event) {
    event.preventDefault();
    $(".city-list").empty();
        $("input[type=text]").each(function() {
            var id=$("#city-search").attr("id");
            var value=$("input[type=text]");
            localStorage.setItem(id, value);
            console.log(id, value)
    })
    recentCity.push(".city-btn");
    console.log(recentCity);
    renderButtons();
    getFiveDay(cityName);
    getOneDay(cityName);
     });
    });


// Adding a click event listener to all elements with a class of ".city-btn"
$(document).on("click", ".city-btn", getOneDay);
    renderButtons(recentCity);

//upon page render, load stored array
//on search click, store value in localStorage


// Use the [OpenWeather API](https://openweathermap.org/api) to retrieve weather data for cities. The documentation includes a section called "How to start" that will provide basic setup and usage instructions. Use `localStorage` to store any persistent data.

// AS A traveler
// I WANT to see the weather outlook for multiple cities
// SO THAT I can plan a trip accordingly

// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
// WHEN I open the weather dashboard
// THEN I am presented with the last searched city forecast