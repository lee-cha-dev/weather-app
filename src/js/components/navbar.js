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
        "   <a id='logo-link' class='underline-hover-right' href=" + navPaths[0] + ">&lt; WeatherApp /&gt;</a>" +
        "   <section id='zip-section' class='zip-section zip-section-active'>" +
        "       <label class='zip-section-label'>Zip Code: </label>" +
        "       <input class='zip-code-value' id='zipCodeValue' placeholder='Enter the Zip' />" +
        "   </section>" +
        "   <span id='exit-zip-mobile' onclick='closeZipMobile()' style='display: flex;' class='theme-icon material-symbols-outlined exit-zip-mobile'>close</span>" +
        "   <span  id='zip-mobile-button' onclick='zipMobileButton()' class='theme-icon material-symbols-outlined zip-mobile-button'>menu</span>" +
        "   <span id='light-icon' onclick='setLightTheme()' class='theme-icon material-symbols-outlined light-icon'>light_mode</span>" +
        "   <span id='dark-icon' onclick='setDarkTheme()' class='theme-icon material-symbols-outlined dark-icon'>dark_mode</span>" +
        "</nav>";

    // RETURN THE NAVBAR
    return (nav);
}

function zipMobileButton(){
    document.getElementById("zip-mobile-button").classList.remove("navbar-elem-mobile-active");
    document.getElementById("zip-mobile-button").classList.add("navbar-elem-mobile-inactive");

    document.getElementById("exit-zip-mobile").classList.remove("navbar-elem-mobile-inactive");
    document.getElementById("exit-zip-mobile").classList.add("navbar-elem-mobile-active");

    document.getElementById("zip-section").classList.remove("zip-section-inactive");
    document.getElementById("zip-section").classList.add("zip-section-active");

    document.getElementById("logo-link").classList.remove("navbar-elem-mobile-active");
    document.getElementById("logo-link").classList.add("navbar-elem-mobile-inactive");
    document.getElementById("logo-link").classList.remove("zip-section-active");

    // FOCUS IN AND MAKE THE ELEMENT ACTIVE
    // NAVBAR'S OPACITY GOES TO HALF WHEN NOT HOVER IF ".click()" IS NOT USER
    document.getElementById("zipCodeValue").focus();
    document.getElementById("zipCodeValue").click();
}

function closeZipMobile(){
    document.getElementById("zip-mobile-button").classList.remove("navbar-elem-mobile-inactive");
    document.getElementById("zip-mobile-button").classList.add("navbar-elem-mobile-active");

    document.getElementById("exit-zip-mobile").classList.remove("navbar-elem-mobile-active");
    document.getElementById("exit-zip-mobile").classList.add("navbar-elem-mobile-inactive");

    document.getElementById("zip-section").classList.remove("zip-section-active");
    document.getElementById("zip-section").classList.add("zip-section-inactive");

    document.getElementById("logo-link").classList.remove("navbar-elem-mobile-inactive");
    document.getElementById("logo-link").classList.add("navbar-elem-mobile-active");

    document.getElementById("zipCodeValue").blur();
}
