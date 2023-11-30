class WeatherDataHandler {

    // CLASS THAT WILL HANDLE UPDATING THE WEATHER ELEMENTS
    // BASED ON THE DATA RETRIEVED
    appView = new Controller();

    // VARIABLES TO HOLD THE WEATHER DATA && URLS
    weatherUrl = "";
    weatherUrlLatLon = "";
    weatherForecastUrl = "";
    weatherData = null;
    weatherForecastData = null;
    city = "";
    zipcode = "";

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
            pressure: ""
        }
    }

    // CONSTRUCTOR
    constructor(){

    }

    getWeatherData(zip){
        // GET THE LAT AND LON FROM THIS API

        let lat = "";
        let lon = "";

        this.weatherUrlLatLon = `https://api.openweathermap.org/geo/1.0/zip?zip=${zip}&appid=${API_KEY}`;

        console.log("test");

        //https://api.openweathermap.org/geo/1.0/zip?zip=72212&appid=e28bf4bd26573284c1430760cd172435

        // TWO FETCH CALLS TO GET THE LONGITUDE AND LATITUDE && GET THE WEATHER BASED ON THE LON AND LAT
        fetch(this.weatherUrlLatLon).then((res) => {
            res.json().then(out => {
                console.log(out);

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
        this.weatherDict.current.feelsLike = this.weatherData["main"]["feelsLike"];
        this.weatherDict.current.pressure = this.weatherData["main"]["pressure"];
        this.weatherDict.current.humidity = this.weatherData["main"]["humidity"];
        this.weatherDict.current.minTemp = this.weatherData["main"]["temp_min"];
        this.weatherDict.current.maxTemp = this.weatherData["main"]["temp_max"];

        // UPDATE THE CURRENT DAY ELEMENTS
        this.appView.updateWeatherGUI();
    }
}