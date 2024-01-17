
const createZipCookies = (zip) => {
    setZipCookies("zip", zip, 90);
}

// GET THE THEME COOKIES -- NOT SPECIFIC ABOUT COOKIE NAMES
// THIS IS DUE TO THERE NOT BEING ANY OTHER COOKIES
// WILL NEED TO ADD A FUNCTION/LOGIC TO BREAK THE COOKIE INTO A DICTIONARY/JS OBJECT
// THEN GET THE COOKIE BASED ON THE DICTIONARY NAME -- TO DO ITEM --
const getZipCookies = () => {
    const decodedCookie = decodeURIComponent(document.cookie);

    const cookies = decodedCookie.split("; ");

    console.log("Cookies Starting: ")
    cookies.forEach(cookie => {
        console.log(cookie)
    })
    console.log("Cookies ending.")

    return cookies[1].split("=");
}

const setZipCookies = (name, value, daysToExpiration) => {
    // GET AND SET DATE TO NUMBER OF DAYS (IN MILLISECONDS)
    const date = new Date();
    date.setTime(date.getTime() + daysToExpiration * 24 * 60 * 60 * 1000);

    // CONVERT DATE TO A UTC STRING
    const expires = date.toUTCString();

    // ADD COOKIE
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires};SameSite=Lax;`;
}

const deleteZipCookies = () => {
    setZipCookies("zip", null, null);
}

const handleZipCookies = () => {
    const ZipCookie = getZipCookies();
    console.log(`ZipCookie: ${ZipCookie}`)
    if (ZipCookie.length === 2){
        // COOKIE ALREADY EXISTS -- SET CURRENT ZIP BEING VIEWED
        console.log(`New Zip: ${ZipCookie[1]}`)
        setZip(ZipCookie[1]);
    }
}

// A COOKIE WILL/SHOULD BE MADE WHEN USER FIRST VISITS SITE. THE COOKIE WILL DETERMINE THE
// DEFAULT COLOR SETTING AND TOGGLE TO LIGHT/DARK BASED ON THOSE SETTINGS. A COOKIE WILL BE
// GENERATED WHEN THIS OCCURS.
// -- THIS SHOULD ONLY HAPPEN WHEN THE USER VISITS FOR THE FIRST TIME OR DOES NOT HAVE
// -- SITE COOKIES FOR THE THEME