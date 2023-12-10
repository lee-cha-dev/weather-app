
const aboutElements =
    "<div>" +
        Navbar() +
        MainSection() +
        CurrentDetailsSection() +
        ForecastSection() +
    "</div>";

const About = () => {
    return (aboutElements);
}

function enterZip(){
    let zipCode = document.getElementById("zipCodeValue").textContent;
    console.log("Zip Code: " + zipCode);
}
