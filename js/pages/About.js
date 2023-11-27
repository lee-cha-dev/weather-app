
const aboutElements =
    "<div>" +
        Navbar() +
    "   <section class='weather-body'>" +
    "       <img id='weather-icon' src='' alt='WeatherIcon' width='300' height='300' />" +
    "   </section>" +
    "</div>";

const About = () => {
    return (aboutElements);
}

function enterZip(){
    let zipCode = document.getElementById("zipCodeValue").textContent;
    console.log("Zip Code: " + zipCode);
}
