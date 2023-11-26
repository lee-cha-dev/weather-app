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
            'index.html',
            'portfolio.html'
        ];
    } else {
        navPaths = [
            './',
            'portfolio'
        ];
    }

    // PASS NAVIGATION PATHS INTO HTML ELEMENT(S).
    const nav =
        "<nav id='navbar' class='navbar'>" +
        "   <a id='logo-link' href=" + navPaths[0] + "><h3 id='logo-text'>&lt; HI /&gt;</h3></a>" +
        "   <a href=" + navPaths[1] + "><p>Portfolio</p></a>" +
        "   <span id='light-icon' onclick='setLightTheme()' class='material-symbols-outlined theme-icon light-icon'>light_mode</span>" +
        "<span id='dark-icon' onclick='setDarkTheme()' class='material-symbols-outlined theme-icon dark-icon'>dark_mode</span>" +
        "</nav>";

    // RETURN THE NAVBAR
    return (nav);
}
