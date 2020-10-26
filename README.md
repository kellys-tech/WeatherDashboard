# Weather Dashboard
### Pages: https://kellys-tech.github.io/WeatherDashboard/develop/index.html
### GitHubRepo:  https://github.com/kellys-tech/WeatherDashboard


*This is a weather dashboard. It contains areas for a city search, a recent search list, the current weather and a 5 day forecast. The user can enter a city to search on or click on a city in the recent searches. The current weather and 5 day forecast will be displayed for that city.*

## Weather Dashboard created using:
* HTML - to create the content of the dashboard. 
* CSS & Bootstrap -  to style the page content.
* JQuery - create interactions for the user
* APIs - to get current weather, 5 day forecast and uv index

## Features
### Input
* Search input
   * user will enter city name
   * click search button to get current weather and 5 day forecast

### Search History
* Searched city names will be stored as a list in recent searches
* User can click on a city name in the list and the current weather and 5 day forecast will be displayed

### Current Weather
* Upon search, current weather will be displayed for the city entered and display the following data
    * City Name
    * Today's date
    * Current weather icon from API
    * Temperature
    * Humidity
    * Wind Speed
    * UV Index

### 5 day forecast
* Upon search, 5 day forecast wil be displayed for the city entered and display the following data
    * Today's date
    * Forecast weather icon from API
    * Temperature
    * Humidity

### Screenshots

![PageLoadNoHistory](assets/PageLoadNoHistory.png)
![SearchAndDisplay](assets/SearchAndDisplay.png)
![BuildingSearchHistory](assets/BuildingSearchHistory.png)
![ChooseCityInHistory](assets/ChooseCityInHistory.png)
![PageLoadWithHistory](assets/PageLoadWithHistory.png)
