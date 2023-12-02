class WeatherDataHandler {

    // URLS TO PRELOAD THE IMAGES
    bgImageUrls = [
        "https://images.unsplash.com/photo-1622278647429-71bc97e904e8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1599209248411-5124adbb1da2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1440407876336-62333a6f010f?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1448032279986-c25cf997c38e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
        "clear sky": "background-image: url('https://images.unsplash.com/photo-1622278647429-71bc97e904e8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');",
        "few clouds": "background-image: url('https://images.unsplash.com/photo-1599209248411-5124adbb1da2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');",
        "scattered clouds": "background-image: url('https://images.unsplash.com/photo-1440407876336-62333a6f010f?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');",
        "broken clouds": "background-image: url('https://images.unsplash.com/photo-1448032279986-c25cf997c38e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');",
        "shower rain": "background-image: url('https://images.unsplash.com/photo-1428592953211-077101b2021b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');",
        "rain": "background-image: url('https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');",
        "thunderstorm": "background-image: url('https://images.unsplash.com/photo-1429552077091-836152271555?q=80&w=1970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');",
        "snow": "background-image: url('https://images.unsplash.com/photo-1547754980-3df97fed72a8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');",
        "mist": "background-image: url('https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');"
    };

    conditionList = [
        "clear sky",
        "few clouds",
        "scattered clouds",
        "broken clouds",
        "shower rain",
        "rain",
        "thunderstorm",
        "snow",
        "mist"
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
            state: ""
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
        // GET THE LAT AND LON FROM THIS API

        let lat = "";
        let lon = "";

        this.weatherUrlLatLon = `https://api.openweathermap.org/geo/1.0/zip?zip=${zip}&appid=${API_KEY}`;

        // TWO FETCH CALLS TO GET THE LONGITUDE AND LATITUDE && GET THE WEATHER BASED ON THE LON AND LAT
        fetch(this.weatherUrlLatLon).then((res) => {
            res.json().then(out => {
                console.log(out);
                this.zipData = out;

                // IF THE FIRST ZIP ENTERED WAS INVALID -- NOTIFY USER -- ELSE RUN THE API
                // CALL TO GET THE WEATHER FOR THE ZIP
                if (out["cod"] === null || out["cod"] !== "404"){
                    // GET THE LATITUDE AND LONGITUDE FROM THE JSON OBJ
                    lat = out["lat"];
                    lon = out["lon"];
                    this.city = out["name"];
                    this.zipcode = zip;

                    // CALL FOR WEATHER UPDATE WITH LATITUDE AND LONGITUDE -- SET UNITS TO IMPERIAL
                    // GET BACK THE CURRENT AND A FORECAST
                    this.weatherUrl =
                        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`;
                    this.weatherForecastUrl =
                        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${API_KEY}&units=imperial`;

                    this.getWeatherDataFromLonLat();
                    this.getWeatherForecastData();
                } else {
                    // THIS WILL BE CALLED WHEN THE USER ENTERS A BAD ZIP
                    // PASS A MESSAGE TO THE USER/UPDATE A MESSAGE LABEL TO NOTIFY USER
                    console.log("BAD ZIP CODE ENTERED!!");
                }
            })
        }).catch(err => {
            console.log(err);
            return false
        });
        return true
    }

    getWeatherDataFromLonLat(){
        fetch(this.weatherUrl).then((res) => {
            res.json().then(out => {
                console.log(out);
                // UPDATE WEATHER DATA
                this.weatherData = out;
                console.log(`${this.city}, ${this.zipcode}`);

                // UPDATE THE WEBPAGE ELEMENTS
                getWeatherIcon();
            }).catch(err => {
                console.log(err);
            });
        });
    }

    getWeatherForecastData() {
        fetch(this.weatherForecastUrl).then((res) => {
            res.json().then(out => {
                console.log(out);
                // UPDATE WEATHER DATA
                this.weatherForecastData = out;

                this.updateWeatherDict();

                // UPDATE THE WEBPAGE ELEMENTS
                // getWeatherIcon();
            }).catch(err => {
                console.log(err);
            });
        });
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
}