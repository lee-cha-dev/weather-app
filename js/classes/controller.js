class Controller {
    constructor() {

    }

    updateWeatherGUI(){
        console.log("UPDATING GUI");

        // UPDATE CURRENT DAY
        this.updateCurrentDayGUI();

        // UPDATE FORECAST

 }

    updateCurrentDayGUI(){
        document.getElementById("current-temp").innerHTML = weatherDataHandler.weatherData["main"]["temp"];
        document.getElementById("current-humidity").innerHTML = weatherDataHandler.weatherDict.current.humidity;
        document.getElementById("current-day").innerHTML = weatherDataHandler.weatherDict.current.day;
    }

    updateForeCastGUI(){

    }
}