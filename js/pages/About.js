
const aboutElements =
    "<div>" +
        Navbar() +
    "   <section class='weather-body'>" +
    "       " +
    "   </section>" +
    "   <section class='zip-section'>" +
    "       <label>Zip Code: </label>" +
    "       <input id='zipCodeValue' placeholder='enter the zip' />" +
    "   </section>" +
    "</div>";

const About = () => {
    return (aboutElements);
}

function enterZip(){
    let zipCode = document.getElementById("zipCodeValue").textContent;
    console.log("Zip Code: " + zipCode);
}
