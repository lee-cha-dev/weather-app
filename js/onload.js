
// TOGGLE DEVELOPMENT AND DEPLOYMENT NAVIGATION
const dev = false;

// ONLOAD FOR ALL BODY TAGS IN EVERY PAGE
function bodyOnLoad(){

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
