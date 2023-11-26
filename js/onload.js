
// TOGGLE DEVELOPMENT AND DEPLOYMENT NAVIGATION
const dev = true;

let weatherData;

let city = "";
let zipcode = "";

// ONLOAD FOR ALL BODY TAGS IN EVERY PAGE
function bodyOnLoad(){



    console.log("Body Loaded\n");

    // GET BODY ELEMENT
    const content = document.getElementById('body-content');
    console.log(window.location.href);
    let dir = window.location.href;
    let dirArr = dir.split('/');
    console.log(dirArr);
    // HANDLING PAGE TO LOAD
    if (dev === false){
        deployedNav(dirArr, content);
    } else {
        devNav(dirArr, content);
    }

    // THEME COOKIES
    handleCookies();

    // EVENT LISTENERS
    //------------------------------------------------------------------------------------------------------------//


    // EVENT LISTENER FOR ZIP CODE ENTRY
    document.getElementById("zipCodeValue").addEventListener("keydown", (evt) => {
        // PREVENT THE USER FROM ENTERING IN NON NUMERICAL CHARACTERS
        if (isNaN(evt.key) && evt.key !== "Backspace" && evt.key !== "Tab"){
            evt.preventDefault();
        }

        let zip = document.getElementById("zipCodeValue").value;

        // GET THE WEATHER DATA FOR THE DATA PROVIDED AFTER CHECK FOR VALID ZIP
        if (evt.key === "Enter"){
            if (zip.length === 5){
                console.log(zip);
                let weatherUrlLatLon = `https://api.openweathermap.org/geo/1.0/zip?zip=${zip}&appid=${API_KEY}`
                // GET THE LAT AND LON FROM THIS API

                let lat = "";
                let lon = "";

                // TWO FETCH CALLS TO GET THE LONGITUDE AND LATITUDE && GET THE WEATHER BASED ON THE LON AND LAT
                fetch(weatherUrlLatLon).then((res) => {
                    res.json().then(out => {
                        console.log(out);

                        // IF THE FIRST ZIP ENTERED WAS INVALID -- NOTIFY USER -- ELSE RUN THE API
                        // CALL TO GET THE WEATHER FOR THE ZIP
                        if (out["cod"] === null || out["cod"] !== "404"){
                            // GET THE LATITUDE AND LONGITUDE FROM THE JSON OBJ
                            lat = out["lat"];
                            lon = out["lon"];
                            city = out["name"];
                            zipcode = zip;

                            // CALL FOR WEATHER UPDATE WITH LATITUDE AND LONGITUDE -- SET UNITS TO IMPERIAL
                            let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`

                            fetch(weatherUrl).then((res) => {
                                res.json().then(out => {
                                    console.log(out);
                                    // UPDATE WEATHER DATA
                                    weatherData = out;

                                    console.log(`${city}, ${zipcode}`);
                                }).catch(err => {
                                    console.log(err);
                                });
                            });
                        } else {
                            console.log("BAD ZIP CODE ENTERED!!");
                        }
                    })
                }).catch(err => {
                    console.log(err);
                });
            } else {
                console.log("Enter A Valid Zip Code.");
            }
        }
    });
}

function updateGUI(){

}

// UPDATE THE NAVIGATION IN BOTH COLUMN AS NEW PAGES ARE ADD -- MIGHT MAKE THIS MORE EFFICIENT
// ADD ANOTHER CASE WITH THE RELEVANT NAME OR FILE NAME
// BE SURE TO UPDATE THE NAV BAR AS WELL
function devNav(dirArr, content){
    // HANDLING PAGE TO LOAD
    switch (dirArr[dirArr.length - 1]){
        case "portfolio.html":          // LOAD PORTFOLIO CONTENT
            console.log("Portfolio");
            content.innerHTML += Portfolio();
            break;
        default:                        // LOAD LANDING PAGE
            console.log("Home Page");
            content.innerHTML += About();
    }
}

function deployedNav(dirArr, content){
    // HANDLING PAGE TO LOAD
    switch (dirArr[dirArr.length - 1]){
        case "portfolio":           // LOAD PORTFOLIO CONTENT
            content.innerHTML += Portfolio();
            break;
        default:                    // LOAD LANDING PAGE
            content.innerHTML += About();
    }
}

// TOGGLE THEME FUNCTIONS -- FOR SETTING THE THEM IN HANDLE THEME
// AND ON CLICK FUNCTIONS FOR THE THEME TOGGLE IN THE NAVBAR --GLOBALLY ACCESSED
function setDarkTheme(){
    // SET BODY THEME
    const body = document.getElementById("body");
    body.classList.remove("body-light-theme");
    body.classList.add("body-dark-theme");

    // SET NAVBAR THEME
    const navbar = document.getElementById('navbar');
    navbar.classList.remove('navbar-light-theme');
    navbar.classList.add('navbar-dark-theme');

    // SWAP ICONS
    // SET LIGHT ICON TOGGLE DISPLAY TO FLEX
    document.getElementById('light-icon').style.display = 'flex';

    // SET DARK ICON TOGGLE DISPLAY TO NONE;
    document.getElementById('dark-icon').style.display = 'none';

    console.log("dark-theme");

    // UPDATE COOKIES
    setThemeCookies("theme", "dark", 90);
}

function setLightTheme(){
    // SET BODY THEME
    const body = document.getElementById("body");
    body.classList.remove("body-dark-theme");
    body.classList.add("body-light-theme");

    // SET NAVBAR THEME
    const navbar = document.getElementById('navbar');
    navbar.classList.remove('navbar-dark-theme');
    navbar.classList.add('navbar-light-theme');

    // SWAP ICONS
    // SET LIGHT ICON TOGGLE DISPLAY TO NONE
    document.getElementById('light-icon').style.display = 'none';

    // SET DARK ICON TOGGLE DISPLAY TO FLEX;
    document.getElementById('dark-icon').style.display = 'flex';

    // UPDATE COOKIES
    setThemeCookies("theme", "light", 90);
}