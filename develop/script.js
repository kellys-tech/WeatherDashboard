$(document).ready(function(){

//create global variables
    var appId="956fc8676fe0450c85daac044501dd01";
    var $srchInput=$(".search input");
    var $history=$(".history");
    var $srchBtn=$(".search button");
    var $detMain=$(".detMain");
    var $forecast=$(".forecast");
    var srchHistory=[];

//create function for getting one day/current weather from api
    function getCurrentWeather(city) {
        // console.log(city);
        var queryUrl="https://api.openweathermap.org/data/2.5/weather?appid=" + appId + "&units=imperial&q=" + city;
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function(response) {
            // console.log(response);

            $detMain.find(".city").text(city);
            $detMain.find(".date").text(formatDate(response.dt));
            $detMain.find(".icon").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
            $detMain.find(".temp span").text(response.main.temp);
            $detMain.find(".humid span").text(response.main.humidity);
            $detMain.find(".wind span").text(response.wind.speed);
            $detMain.find(".uv span").attr("class", "").text("");
            getUV(response.coord.lat, response.coord.lon);

            $detMain.show();
//store data in localStorage to be recalled
            if(srchHistory.indexOf(city) < 0) {
                srchHistory.push(city);
                localStorage.setItem("history", JSON.stringify(srchHistory));
                getHis();
            }
//call get 5 day function to update data along with current/one day weather   
            get5Day(city);
//create error case if response is not returned
        }).catch(function(err){
            console.log("error");
        });
    }

//create getUV function to be called in the current/one day weather function
    function getUV(lat, lon) {
        console.log(lat, lon);
        var queryUrl="https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + appId;
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function(response){
            console.log(response);
            $detMain.find(".uv span").text(response.value);
//if else statements for coloring the index value
            if(response.value > 7) {
                $detMain.find(".uv span").addClass("bg-danger").addClass("text-white");
            } 
            else if(response.value > 5) {
                $detMain.find(".uv span").addClass("bg-warning");
            }
            else {
                $detMain.find(".uv span").addClass("bg-success");
            }
 //create error case if response is not returned       
        }).catch(function(err) {
            console.log("error");
        });
    }

//create get history function to be used when clicking recent city
    function getHis() {
        var hisStore=JSON.parse(localStorage.getItem("history"));
        if(hisStore) srchHistory=hisStore;
       
        $history.find("a").remove();
        srchHistory.forEach(function(item) {
            console.log(item);
            $history.append('<a href="#" class="list-group-item list-group-item-action historyItem" data-city="' + item + '">' + item + '</a>');
        });
    }

//format date function
    function formatDate(date) {
        var formattedDate = new Date( date * 1000).toLocaleDateString();
        return formattedDate;
    }

//creat click event for search history
    $history.on("click", ".historyItem", function() {
        if($srchInput.val()) {
            getCurrentWeather($srchInput.val());
            $srchInput.val("");
        }
    });

//create get 5 day weather function to be called in the get one day/current weather function
    function get5Day(city) {
        var queryUrl="https://api.openweathermap.org/data/2.5/forecast?appid=" + appId + "&units=imperial&q=" + city;
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function(response) {
            console.log(response);

            var filteredList=response.list.filter(function(date) {
                return date.dt_txt.indexOf("15:00:00") > -1;
            });
            // console.log(filteredList);
//loop through list of days returned in 5 day to display each parameter
            filteredList.forEach(function(date, i){
                $(".day" + (i+1)).find(".date").text(date.dt_txt.slice(0, date.dt_txt.indexOf(" ")));
                $(".day" + (i+1)).find(".date").text(formatDate(date.dt));
                $(".day" + (i+1)).find(".icon").attr("src", "https://openweathermap.org/img/w/" + date.weather[0].icon + ".png");
                $(".day" + (i+1)).find(".temp span").text(date.main.temp);
                $(".day" + (i+1)).find(".humid span").text(date.main.humidity);
            });
//show forecast - it is hidden on page load
            $forecast.show();
//console log an error if no response is returned
        }).catch(function(err){
            console.log("error");
        });

    }

//create click event for search button
$srchBtn.on("click", function(){
    if($srchInput.val()) {
        getCurrentWeather($srchInput.val());
        $srchInput.val("");
    }
});

//create click event when city is selected in search history
$history.on("click",".historyItem", function(){
    if($(this).attr("data-city")) {
        getCurrentWeather($(this).attr("data-city"));
    }
})

// hide curernt and 5 day forecast areas on page load
    $detMain.hide();
    $forecast.hide();
    getHis();

});