// NAV IS USED TO HOLD THE HTML FOR THE NAVBAR
// THE DEV GLOBAL WILL DETERMINE WHICH LINKS TO USE
// ADD A TAGS ANYTIME A NEW NAV BUTTON IS ADDED TO THE NAVBAR
// ENSURE THAT BOTH DEVELOPMENT NAV AND DEPLOYMENT NAV ARE UPDATED


const Navbar = () => {
    // NAV ELEMENT TO HOLD THE NAVBAR'S HTML
    let navPaths;

    // IF THE WEBSITE IS IN DEVELOPMENT MODE, THEN SET THE PAGES TO THEIR HTML PAGE
    // ELSE USE THE DEPLOYED LINKS
    // ----PATHS SHOULD BE LISTED FIRST TO LAST AS THEY APPEAR LEFT TO RIGHT IN THE NAV
    //     HTML BELOW.
    if (dev === true){
        navPaths = [
            'index.html'
        ];
    } else {
        navPaths = [
            './'
        ];
    }

    // PASS NAVIGATION PATHS INTO HTML ELEMENT(S).
    const nav =
        "<nav id='navbar' class='navbar'>" +
        "   <a id='logo-link' href=" + navPaths[0] + "><h3 id='logo-text'>&lt; WeatherApp /&gt;</h3></a>" +
        "   <section id='zip-section' class='zip-section'>" +
        "       <label>Zip Code: </label>" +
        "       <input class='zip-code-value' id='zipCodeValue' placeholder='Enter the Zip' />" +
        "   </section>" +
        "   <span id='exit-zip-mobile' onclick='closeZipMobile()' style='display: none;' class='material-symbols-outlined exit-zip-mobile'>close</span>" +
        "   <span  id='zip-mobile-button' onclick='zipMobileButton()' class='material-symbols-outlined zip-mobile-button light-icon'>menu</span>" +
        "   <span id='light-icon' onclick='setLightTheme()' class='material-symbols-outlined theme-icon light-icon'>light_mode</span>" +
        "   <span id='dark-icon' onclick='setDarkTheme()' class='material-symbols-outlined theme-icon dark-icon'>dark_mode</span>" +
        "</nav>";

    // RETURN THE NAVBAR
    return (nav);
}

function zipMobileButton(){
    console.log("Mobile Button Clicked");

    document.getElementById("zip-mobile-button").style.display = "none";
    document.getElementById("exit-zip-mobile").style.display = "flex";
    document.getElementById("zip-section").style.display = "flex";
    document.getElementById("zip-section").style.right = "140px";
    document.getElementById("logo-link").style.display = "none";
}

function closeZipMobile(){
    document.getElementById("zip-mobile-button").style.display = "flex";
    document.getElementById("exit-zip-mobile").style.display = "none";
    document.getElementById("zip-section").style.display = "none";
    document.getElementById("zip-section").style.right = "80px";
    document.getElementById("logo-link").style.display = "flex";
}
