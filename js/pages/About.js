
const aboutElements =
    "<div>" +
        Navbar() +
        MainSection() +
        CurrentDetailsSection() +
    "</div>";

const About = () => {
    return (aboutElements);
}

function enterZip(){
    let zipCode = document.getElementById("zipCodeValue").textContent;
    console.log("Zip Code: " + zipCode);
}
