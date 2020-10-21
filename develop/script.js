  

 var APIkey="956fc8676fe0450c85daac044501dd01";
 var city = $(".city");
 var searchBtn = $(".search")
 var recentCity = [];
 
 function getFiveDay(cityName){
    //var cityName = "Orlando";
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName+ "&units=imperial&appid=" + APIkey;

    console.log(queryURL);
 
    $.ajax({
        url: queryURL,
        method: "GET"
  })
    .then(function(response) {
        $(".fiveDay").empty();
        //runs every 3 hours 24hours= 3*8
    //date
    //moment(apidatadate).format("ll")
        console.log(queryURL);
        //console.log(response);

        //$(".current-city").html("<h1>" + response.city.name +  response.list.weather.icon);

        /**
         <div class="card">
            <div class="card-body">
            <p>temp</p>
            <div>
         </di>
         */
        for (var i=0; i < 5; i++){
        var d1=$("<div>");
        var d2=$("<div>");
        d1.attr("class","card");
        d2.attr("class","card-body");

        var temp=$("<p>");
        var hum= $("<p>");
        var wind=$("<p>");
        var date=$("<p>");
        //console.log(response.list[i*8].dt_text)
        date.text(moment(response.list[i*8].dt_txt).format("ll"))
        temp.html("Current Temp: " + response.list[i*8].main.temp + " °F");
        hum.html("Humidity: " + response.list[i*8].main.humidity + "%");
        wind.html("Wind Speed: " + response.list[i*8].wind.speed + " MPH");

        d2.append(date);
        d2.append(temp);
        d2.append(hum);
        d2.append(wind);

        d1.append(d2)

        //.fiveDay
        $(".fiveDay").append(d1);
        }
        
    })
}

function getOneDay(cityName){
    // current date with moment.js
        //moment().format("ll");
    var oneDay = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+APIkey;
    console.log(oneDay);

    $.ajax({
        url: oneDay,
        method: "GET"
  })
    .then(function(onedayobj) {
        var lon=(onedayobj.coord.lon);
        var lat=(onedayobj.coord.lat);
        //http://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid={API key}
        var uvURL="http://api.openweathermap.org/data/2.5/uvi?lat="+lat+"&lon="+lon + "&appid=" +APIkey;
        console.log(uvURL)

        $.ajax({
            url: uvURL,
            method: "GET"
      })
        .then(function(uvObj) {
            console.log(uvObj)
            //UV index is a separate API
            console.log(uvObj.value)
        ///lon
        //lat
        //=>ajax
            
        })
       
      


    
    })
}
getFiveDay("Orlando");


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