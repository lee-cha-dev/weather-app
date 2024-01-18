
const createZipCookies = (zip) => {
    console.log(`Setting ZipCookie: ${zip}`)
    setZipCookies("zip", zip);
}

// GET THE THEME COOKIES -- NOT SPECIFIC ABOUT COOKIE NAMES
// THIS IS DUE TO THERE NOT BEING ANY OTHER COOKIES
// WILL NEED TO ADD A FUNCTION/LOGIC TO BREAK THE COOKIE INTO A DICTIONARY/JS OBJECT
// THEN GET THE COOKIE BASED ON THE DICTIONARY NAME -- TO DO ITEM --
const getZipCookies = () => {
    const decodedCookie = decodeURIComponent(document.cookie);
    let retVal = -1
    const cookies = decodedCookie.split("; ");
    cookies.forEach(cookie => {
        console.log(`${cookie}\tContains Zip: ${cookie.includes("zip")}`)
        if (cookie.includes("zip")) retVal = cookie.split("=")
    })
    return retVal;
}

const setZipCookies = (name, value) => {
    // GET AND SET DATE
    const date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    // ADD COOKIE
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${date.toUTCString()};SameSite=Lax;path=/;`;
}

const deleteZipCookies = () => {
    setZipCookies("zip", null);
}

const handleZipCookies = () => {
    const ZipCookie = getZipCookies();
    console.log(`ZipCookie: ${ZipCookie}`)
    if (ZipCookie !== -1){
        // COOKIE ALREADY EXISTS -- SET CURRENT ZIP BEING VIEWED
        console.log(`New Zip: ${ZipCookie[1]}`)
        setZip(ZipCookie[1]);
    } else {
        console.log(`New Zip: 85001`)
        setZip("85001")
    }
}