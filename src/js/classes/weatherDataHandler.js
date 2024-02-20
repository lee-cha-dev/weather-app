// import { request } from "express";

class WeatherDataHandler {
    themeMode = "light";
    currentZip = 0;

    // URLS TO PRELOAD THE IMAGES
    bgImageUrls = [
        "https://images.unsplash.com/photo-1622278647429-71bc97e904e8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1599209248411-5124adbb1da2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1440407876336-62333a6f010f?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1448032279986-c25cf997c38e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1500740516770-92bd004b996e?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1428592953211-077101b2021b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1429552077091-836152271555?q=80&w=1970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1547754980-3df97fed72a8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ];

    // ARRAY TO HOLD PRELOADED IMAGES
    preloadedImages = [];

    // CLASS THAT WILL HANDLE UPDATING THE WEATHER ELEMENTS
    // BASED ON THE DATA RETRIEVED
    appController = new Controller();

    // VARIABLES TO HOLD THE WEATHER DATA && URLS
    weatherUrl = "";
    weatherUrlLatLon = "";
    weatherForecastUrl = "";
    zipData = null;
    weatherData = null;
    weatherForecastData = null;
    city = "";
    zipcode = "";

    days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    // DICTIONARY TO SET THE CORRECT IMAGE FOR THE BACKGROUND
    possibleConditions = {
        "sky": "background-image: url('https://images.unsplash.com/photo-1622278647429-71bc97e904e8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');",
        "clouds": "background-image: url('https://images.unsplash.com/photo-1599209248411-5124adbb1da2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');",
        // "scattered clouds": "background-image: url('https://images.unsplash.com/photo-1440407876336-62333a6f010f?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');",
        // "clouds": "background-image: url('https://images.unsplash.com/photo-1448032279986-c25cf997c38e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');",
        // "overcast clouds": "background-image: url('https://images.unsplash.com/photo-1500740516770-92bd004b996e?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');",
        // "shower rain": "background-image: url('https://images.unsplash.com/photo-1428592953211-077101b2021b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');",
        "rain": "background-image: url('https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');",
        "thunderstorm": "background-image: url('https://images.unsplash.com/photo-1429552077091-836152271555?q=80&w=1970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');",
        "snow": "background-image: url('https://images.unsplash.com/photo-1547754980-3df97fed72a8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');",
        "mist": "background-image: url('https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');",
        "smoke": "background-image: url('https://images.unsplash.com/photo-1585644156378-72d15fa33be5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');",
        "haze": "background-image: url('https://images.unsplash.com/photo-1533757704860-384affeed946?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');",
        "dust": "background-image: url('https://images.unsplash.com/photo-1662377824580-a540e7728635?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');",
        "fog": "background-image: url('https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');",
        "sand": "background-image: url('https://images.unsplash.com/photo-1662377824580-a540e7728635?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');",
        "ash": "background-image: url('https://images.unsplash.com/photo-1470260749628-75a34921a98a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        "squall": "background-image: url('https://images.unsplash.com/photo-1429552077091-836152271555?q=80&w=1970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');",
        "tornado": "background-image: url('https://images.unsplash.com/photo-1695605117745-ae4e5d85dfb3?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
    };

    // NEED TO EXPAND ON THE CONDITIONS -> THERE ARE NUMEROUS EXPANDED CONDITIONS UNDER RAIN, THUNDERSTORM, ETC.
    // A FUNCTION WILL NEED TO BE CALLED IN ORDER TO MATCH THE CORRECTION PRIMARY CONDITION FOR ALL SUB-CONDITIONS
    // NEED TO ADD SMOKE, HAZE, DUST, FOG, SAND, ASH, SQUALL, TORNADO

    conditionList = [
        "sky",
        "clouds",
        "rain",
        "thunderstorm",
        "snow",
        "mist",
        "smoke",
        "haze",
        "dust",
        "fog",
        "sand",
        "ash",
        "squall",
        "tornado"
    ]

    // REFS:
    // THUNDERSTORM: https://unsplash.com/photos/lightning-strike-during-blue-sky-3qucB7U2l7I
    //  -- Brandon Morgan: littleppl85
    // Rain: https://unsplash.com/photos/dew-drops-on-glass-panel-bWtd1ZyEy6w
    //  -- Valentin Muller: wackeltin_meem
    // CLEAR SKY: https://unsplash.com/photos/blue-sky-with-white-sun-zjoydJb17mE
    //  -- GROOVELAND DESIGNS
    // SCATTERED CLOUDS: https://unsplash.com/photos/aerial-photograph-of-clouds-5D47VsGV86c
    //  -- DANTIST SOH: DANTIST07
    // FEW CLOUDS: https://unsplash.com/photos/white-clouds-and-blue-sky-during-daytime-HBh8cFTfAPE
    //  -- ENGIN AKYURT
    // BROKEN CLOUDS: https://unsplash.com/photos/photography-of-white-clouds-with-sun-refection-downward-_nkcMamrvhU
    //  -- TONY MAELSTROM: ASTRONOMICAL
    // SHOWER RAIN: https://unsplash.com/photos/grayscale-photography-of-raindrops-Nw_D8v79PM4
    //  -- RESA SHAYESTEHPOUR: R_SHAYESREHPOUR
    // SNOW: https://unsplash.com/photos/trees-and-snowdrop-w8hWTFpGtpY
    //  -- CHANDLER CRUTTENDEN: CHANPHOTO
    // MIST: https://unsplash.com/photos/bare-tree-between-road-7CME6Wlgrdk
    //  -- ANNIE SPRATT: ANNIESPRATT
    // DUST: https://unsplash.com/photos/a-tree-in-a-foggy-field-1r1C-vg47Cg
    //  -- PETER STRYDOM: PETERSTRYDOM
    // HAZE: https://unsplash.com/photos/white-cotton-on-white-textile-jZc5eTXnYLU
    //  -- CORINA RAINER: CORINA_RAINER_
    // FOG: https://unsplash.com/photos/grayscale-photography-of-fog-covered-mountain-M6PJrAd26M0
    //  -- DAMON LAM: DAYDAY95
    // ASH: https://unsplash.com/photos/tree-surrounded-by-fog-at-daytime-geZWtn67V9U
    //  -- Bjørn Tore Økland: bearthor
    // TORNADO: https://unsplash.com/photos/a-large-tornado-is-coming-down-the-road-onCIfj_UIeQ
    //  -- GREG JOHNSON: TORNADOGREG

    // DICT TO HOLD CURRENT DAY WEATHER DATA AND FORECAST DATA
    weatherDict = {
        current: {
            temp: "",
            feelsLike: "",
            day: "",
            humidity: "",
            minTemp: "",
            maxTemp: "",
            condition: "",
            pressure: "",
            wind: "",
            visibility: "",
            airQuality: "",
            sunrise: "",
            sunset: "",
            city: "",
            state: "",
            icon: ""
        },
        forecast: []
    };

    // CONSTRUCTOR
    constructor(){
        // PRELOAD BG IMAGES
        let img = new Image();
        let key = "";
        for (let i = 0; i < this.bgImageUrls.length; ++i){
            img.src = this.bgImageUrls[i];
            key = this.conditionList[i]
            this.preloadedImages.push({key, img});
        }
    }

    getWeatherData(zip){
        console.log(`Zip: ${zip}`);

        // FETCH THE WEATHER DATA USING THE ZIP
        let urlencoded = new URLSearchParams();
        urlencoded.append("zip", zip);

        let requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: urlencoded,
            redirect: 'follow'
        };

        let data = null;

        fetch(`http://localhost:8080/weather-data?zip=${zip}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                // PARSE THE JSON BEING SENT BACK
                data = JSON.parse(result);

                // DEBUG TO ENSURE DATA IS COMING THROUGH AS EXPECTED
                console.log("---------------------------------");
                console.log(data.zipData);
                console.log("---------------------------------");
                console.log(data.weatherData);
                console.log("---------------------------------");
                console.log(data.forecastData);
                console.log("---------------------------------");

                // STORE THE DATA LOCALLY
                this.weatherData = data.weatherData;
                this.weatherForecastData = data.forecastData;
                this.zipData = data.zipData;

                this.updateWeatherDict();
                // UPDATE THE WEATHER DICT & GUI
            }).catch(error => console.log('error', error));
    }

    updateWeatherDict(){
        // UPDATE CURRENT DAY
        this.weatherDict.current.day = "TestDay";
        this.weatherDict.current.temp = this.weatherData["main"]["temp"];
        this.weatherDict.current.feelsLike = this.weatherData["main"]["feels_like"];
        this.weatherDict.current.pressure = this.weatherData["main"]["pressure"];
        this.weatherDict.current.humidity = this.weatherData["main"]["humidity"];
        this.weatherDict.current.minTemp = this.weatherData["main"]["temp_min"];
        this.weatherDict.current.maxTemp = this.weatherData["main"]["temp_max"];
        this.weatherDict.current.condition = this.weatherData["weather"][0]["description"];
        this.weatherDict.current.wind = this.weatherData["wind"]["speed"];
        this.weatherDict.current.visibility = this.weatherData["visibility"];
        this.weatherDict.current.sunrise = this.weatherData["sys"]["sunrise"];
        this.weatherDict.current.sunset = this.weatherData["sys"]["sunset"];
        this.weatherDict.current.city = this.zipData["name"];
        this.weatherDict.current.state = this.weatherData["name"];
        this.weatherDict.current.icon = this.weatherData["weather"][0]["icon"]

        // UPDATE FORECAST -- CLEAR THE FORECAST ARRAY FIRST
        this.weatherDict.forecast = [];
        let newDict = {};
        for (let i = 0; i < 8; i++){
            newDict = {
                high: this.weatherForecastData["daily"][i]["temp"]["max"],
                low: this.weatherForecastData["daily"][i]["temp"]["min"],
                condition: this.weatherForecastData["daily"][i]["weather"][0]["description"],
                icon: this.weatherForecastData["daily"][i]["weather"][0]["icon"]
            };
            this.weatherDict.forecast.push(newDict);
        }
        // UPDATE THE CURRENT DAY ELEMENTS
        this.appController.updateWeatherGUI();
    }

    updateZip(zip){
        this.currentZip = zip;
    }
}