
const aboutElements =
    "<div>" +
        Navbar() +
    "   <section class='weather-body'>" +
    "       <img id='weather-icon' src='' alt='WeatherIcon' width='300' height='300' />" +
    "       <h1 id='current-temp'>test</h1>" +
    "       <h2 id='current-humidity'>test</h2>" +
    "       <h2 id='current-day'>test</h2>" +
    "   </section>" +
    "</div>";

const About = () => {
    return (aboutElements);
}

function enterZip(){
    let zipCode = document.getElementById("zipCodeValue").textContent;
    console.log("Zip Code: " + zipCode);
}
