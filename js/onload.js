
// TOGGLE DEVELOPMENT AND DEPLOYMENT NAVIGATION
const dev = true;
let weatherDataHandler = new WeatherDataHandler();

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

    document.getElementById("zipCodeValue").addEventListener("click", (evt) => {
        document.getElementById("navbar").style.opacity = "1.0";
    });

    document.getElementById("zipCodeValue").addEventListener("focusout", (evt) => {
        if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
            document.getElementById("navbar").style.opacity = "0.5";
        } else {
            document.getElementById("navbar").style.opacity = "1";
        }
        // CLOSE THE MOBILE ZIP TEXT ENTRY
        closeZipMobile();
    });

    // EVENT LISTENER FOR ZIP CODE ENTRY
    document.getElementById("zipCodeValue").addEventListener("keydown", (evt) => {
        // PREVENT THE USER FROM ENTERING IN NON NUMERICAL CHARACTERS
        if (isNaN(evt.key) && evt.key !== "Backspace" && evt.key !== "Tab"){
            evt.preventDefault();
            // ONLY ALLOW 5 DIGITS TO BE ENTERED
            if (document.getElementById("zipCodeValue").value.length === 5){
                let zip = document.getElementById("zipCodeValue").value;

                // GET THE WEATHER DATA FOR THE DATA PROVIDED AFTER CHECK FOR VALID ZIP
                getWeatherFromAPI(evt, zip);
            } else {
                console.log("Five digits must be entered. No more. No less.");
            }
        }
    });

    // HANDLE OPACITY CHANGE ON SCROLL FOR NAVBAR
    window.onscroll = () => {
        document.getElementById("zipCodeValue").blur();
        if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
            document.getElementById("navbar").style.opacity = "0.5";
        } else {
            document.getElementById("navbar").style.opacity = "1";
        }

        // CLOSE THE MOBILE ZIP TEXT ENTRY
        closeZipMobile();
    }

    window.addEventListener("resize", mobileZipInputHandler)

    // HANDLE THE ZIP BUTTON'S MOBILE SETUP
    mobileZipInputHandler();

    // LOAD IN A DEFAULT ZIP TO POPULATE THE PAGE WITH REAL TIME DATA
    weatherDataHandler.getWeatherData(85001);
}

function mobileZipInputHandler(){
    const currentHeight = window.innerHeight;
    const currentWidth = window.innerWidth;

    if (currentWidth <= 750 && currentWidth > 575){
        // SWITCH TO MOBILE BUTTON FOR ZIP INPUT
        document.getElementById("zip-section").style.display = "none";
        document.getElementById("zip-mobile-button").style.display = "flex";

        // MAIN SECTION LAYOUT -- BACK TO DESKTOP
        document.getElementById("main-wrapper").style.flexDirection = "row";
        document.getElementById("main-wrapper").style.marginLeft = "-6vh";
        document.getElementById("main-details").style.marginTop = "0";
    } else if (currentWidth <= 575){
        // SWITCH THE MAIN SECTION'S LAYOUT -- BACK TO MOBILE
        document.getElementById("main-wrapper").style.flexDirection = "column";
        document.getElementById("main-wrapper").style.marginLeft = "0";
        document.getElementById("main-details").style.marginTop = "-30px";

        document.getElementById("zip-section").style.display = "none";
        document.getElementById("zip-mobile-button").style.display = "flex";
    } else {
        document.getElementById("zip-section").style.display = "flex";
        document.getElementById("zip-mobile-button").style.display = "none";

        // MAIN SECTION LAYOUT -- BACK TO DESKTOP
        document.getElementById("main-wrapper").style.flexDirection = "row";
        document.getElementById("main-wrapper").style.marginLeft = "-6vh";
        document.getElementById("main-details").style.marginTop = "0";
    }
}

function getWeatherFromAPI(evt, zip){
    // GET THE WEATHER DATA FOR THE DATA PROVIDED AFTER CHECK FOR VALID ZIP
    if (evt.key === "Enter"){
        if (zip.length === 5){
            console.log(zip);

            // CALL GET WEATHER TO UPDATE THE WEATHER DATA
            // THE CONTROLLER CLASS OBJ WITHIN WEATHER DATA WILL
            // HANDLE UPDATING THE GUI ELEMENTS
            weatherDataHandler.getWeatherData(zip);

        } else {
            console.log("Enter A Valid Zip Code.");
        }
    }
}

function getWeatherData_Thread(zip){

}

function getWeatherIcon(){
    // GET THE ICON FROM THE DATA
    let weatherIcon = weatherDataHandler.weatherData["weather"][0]["icon"];
    document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${weatherIcon}@4x.png`;
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
    weatherDataHandler.themeMode = "dark";
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

    // TOGGLE THE MOBILE ICON CLASS
    document.getElementById("zip-mobile-button").classList.remove("light-icon");
    document.getElementById("zip-mobile-button").classList.add("dark-icon");

    console.log("dark-theme");

    // UPDATE COOKIES
    setThemeCookies("theme", "dark", 90);
}

function setLightTheme(){
    weatherDataHandler.themeMode = "light";
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

    // TOGGLE THE MOBILE ICON CLASS
    document.getElementById("zip-mobile-button").classList.remove("dark-icon");
    document.getElementById("zip-mobile-button").classList.add("light-icon");

    // UPDATE COOKIES
    setThemeCookies("theme", "light", 90);
}