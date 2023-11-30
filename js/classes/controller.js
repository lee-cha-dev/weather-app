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
        document.getElementById("current-temp").innerHTML =
            `${weatherDataHandler.weatherData["main"]["temp"]} °F`;
        document.getElementById("current-day").innerHTML = weatherDataHandler.weatherDict.current.day;
        // document.getElementById("current-humidity").innerHTML = weatherDataHandler.weatherDict.current.humidity;

        // CAPITALIZE THE FIRST LETTER OF EACH WORD IN THE CONDITION
        let conditionString = weatherDataHandler.weatherDict.current.condition;
        let conArray = conditionString.split(" ");

        for (let i = 0; i < conArray.length; ++i){
            let first = conArray[i].at(0).toUpperCase();
            conArray[i] = first + conArray[i].slice(1);
        }
        document.getElementById("current-condition").innerHTML = conArray.join(" ");
    }

    updateForeCastGUI(){

    }
}