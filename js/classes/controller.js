class Controller {
    date = new Date();
    day = this.date.getDay();

    forecastArr = [
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight"
    ];

    constructor() {

    }

    updateWeatherGUI(){
        console.log("UPDATING GUI");

        // UPDATE CURRENT DAY
        this.updateCurrentDayGUI();

        // UPDATE FORECAST

    }

    updateCurrentDayGUI(){
        // BACKGROUND
        document.getElementsByClassName("body-light-theme")[0].style = weatherDataHandler.possibleConditions[weatherDataHandler.weatherDict.current.condition];

        // MAIN SECTION
        document.getElementById("current-temp").innerHTML =
            `${weatherDataHandler.weatherData["main"]["temp"]} °F`;
        document.getElementById("current-condition").innerHTML =
            this.getFirstLettersCapitalized(weatherDataHandler.weatherDict.current.condition);
        document.getElementById("current-place").innerHTML =
            `${weatherDataHandler.weatherDict.current.city}, ${weatherDataHandler.weatherDict.current.state}`

        // CURRENT DETAILS SECTION
        document.getElementById("detail-tile-value-Humidity").innerHTML =
            weatherDataHandler.weatherDict.current.humidity + "%";
        document.getElementById("detail-tile-value-Wind").innerHTML =
            weatherDataHandler.weatherDict.current.wind + " mph";
        document.getElementById("detail-tile-value-Visibility").innerHTML =
            weatherDataHandler.weatherDict.current.visibility;
        document.getElementById("detail-tile-value-Feels-Like").innerHTML =
            weatherDataHandler.weatherDict.current.feelsLike;
        document.getElementById("detail-tile-value-Sunrise").innerHTML =
            weatherDataHandler.weatherDict.current.sunrise;
        document.getElementById("detail-tile-value-Sunset").innerHTML =
            weatherDataHandler.weatherDict.current.sunset;

        // FORECAST SECTION
        let count = 0;
        let offset = 1;
        let tempId = "";
        while (count < 8){
            tempId = `forecast-tile-day-${this.forecastArr[count]}`

            // UPDATE EACH TILE
            document.getElementById(tempId).innerHTML = weatherDataHandler.days[this.day + offset];
            document.getElementById(`forecast-tile-high-${this.forecastArr[count]}`).innerHTML =
                weatherDataHandler.weatherDict.forecast[count].high;
            document.getElementById(`forecast-tile-low-${this.forecastArr[count]}`).innerHTML =
                weatherDataHandler.weatherDict.forecast[count].low;
            document.getElementById(`forecast-tile-condition-${this.forecastArr[count]}`).innerHTML =
                this.getFirstLettersCapitalized(weatherDataHandler.weatherDict.forecast[count].condition);
            document.getElementById(`forecast-tile-icon-${this.forecastArr[count]}`).src =
                `https://openweathermap.org/img/wn/${weatherDataHandler.weatherDict.forecast[count].icon}@2x.png`;

            // HANDLE INDEX BOUNDARIES
            offset += 1;
            if (this.day + offset > 6){
                offset = this.day * -1;
            }
            count++;
        }
    }

    // CAPITALIZE THE FIRST LETTER OF EACH WORD IN THE CONDITION
    getFirstLettersCapitalized(str){
        let conArray = str.split(" ");
        let first = "";
        for (let i = 0; i < conArray.length; ++i){
            first = conArray[i].at(0).toUpperCase();
            conArray[i] = first + conArray[i].slice(1);
        }
        return conArray.join(" ");
    }
}