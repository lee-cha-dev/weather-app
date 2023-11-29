class WeatherDataHandler {

    weatherUrl = "";
    weatherUrlLatLon = "";
    weatherData = null;
    weatherIconPath = "";
    city = "";
    zipcode = "";

    // CONSTRUCTOR
    constructor(){

    }

    getWeatherData(zip){
        // GET THE LAT AND LON FROM THIS API

        let lat = "";
        let lon = "";

        this.weatherUrlLatLon = `https://api.openweathermap.org/geo/1.0/zip?zip=${zip}&appid=${API_KEY}`

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
                    this.weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`
                    this.getWeatherDataFromLonLat();
                } else {
                    // THIS WILL BE CALLED WHEN THE USER ENTERS A BAD ZIP
                    // PASS A MESSAGE TO THE USER/UPDATE A MESSAGE LABEL TO NOTIFY USER
                    console.log("BAD ZIP CODE ENTERED!!");
                }
            })
        }).catch(err => {
            console.log(err);
        });
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
}