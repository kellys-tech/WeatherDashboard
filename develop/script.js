$(document).ready(function(){
    var appId="956fc8676fe0450c85daac044501dd01";
    var $srchInput=$(".search input");
    var $history=$(".history");
    var $srchBtn=$(".search button");
    var $detMain=$(".mainDetails");
    var $forecast=$(".mainForecast");
    var srchHistory=[];

    function getCurrentWeather(city) {
        console.log(city);

        var queryUrl="http://api.openweathermap.org/data/2.5/weather?appid=" + appId + "&units=imperial&q=" + city;
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function(response) {
            console.log(response);

            $detMain.find(".city").text(city);
            $detMain.find(".icon").attr("src", "http://openweathermap.org/img/w" + response.weather[0].icon + ".png");
            $detMain.find(".temp span").text(response.main.temp);
            $detMain.find(".humid span").text(response.main.humidity);
            $detMain.find(".wind span").text(response.wind.speed);
            $detMain.find(".uv span").attr("class", "").text("");
            $detMain.find(".date").text(formatDate(response.dt));
            getUV(response.coord.lat, response.coord.lon);

            $detMain.show();

            if(srchHistory.indexOf(city) < 0) {
                srchHistory.push(city);
                localStorage.setItem("history", JSON.stringify(srchHistory));
            }
            
            get5Day(city);
        }).catch(function(err){
            console.log("error");
        });
    }

    function getUV(lat, long) {
        var queryUrl="http://api.openweathermap.org/data/2.5/uvi?appid=" + appId + "$lat=" + lat + "&lon=" + long;
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function(response){
            console.log(response);

            $detMain.find(".uv span").text(response.value);
            if(response.value > 6) {
                $detMain.find(".uv span").addClass("bg-danger").addClass("text-white");
            } 
            else if(response.value > 5) {
                $detMain.fin(".uv span").addClass("bg-warning");
            }
            else {
                $detMain.find(".uv span").addClass("bg-success");
            }
        }).catch(function(err) {
            console.log("error");
        });
    }

    function getHis() {
        var hisStore=JSON.parse(localStorage.getItem("history"));
        if(hisStore) srchHistory=hisStore;
        
        $history.find("a").remove();
        srchHistory.forEach(function(item) {
            console.log(item);
            $history.append('<a href="#" class="list-group-item list-group-item-action historyItem" data-city="' + item + '">' + item + '</a>');
        });
    }

    function formatDate(date) {
        var formattedDate = new Date( date * 1000).toLocaleDateString();
        return formattedDate;
    }

    $history.on("click", ".history", function() {
        if($srchInput.val()) {
            getCurrentWeather($srchInput.val());
            $srchInput.val("");
        }
        $detMain.hide();
        $forecast.hide();
    });

    function get5Day(city) {
        var queryUrl="api.openweathermap.org/data/2.5/forecast?appid=" + appId + "&units=imperial&q=" + city;
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function(response) {
            console.log(response);

            var filteredList=res.list.filter(function(date) {
                return date.dt_txt.indexOf("15:00:00") > -1;
            });
            console.log(filteredList);

            filteredList.forEach(function(date, i){
                $(".day" + (i+1)).find(".date").text(date.dt_txt.slice(0, date.dt_txt.indexOf(" ")));
                $(".day" + (i=1)).find(".icon").attr("src", "http://openweathermap.org/img/w" + date.weather[0].icon + ".png");
                $(".day" + (i+1)).find(".temp span").text(date.main.temp);
                $(".day" + (i+1)).find(".humid span").text(date.main.humidity);
            });

            $forecast.show();
        }).catch(function(err){
            console.log("error");
        });

    }

$srchBtn.on("click", function(){
    if($srchInput.val()) {
        getCurrentWeather($srchInput.val());
        $srchInput.val("");
    }
})
    $detMain.hide();
    $forecast.hide();
    getHis();

});