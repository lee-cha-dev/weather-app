
const About = () => {
    const aboutElements = `
        <div class='main-body main-body-loading' id='main-body'>
            ${Navbar()}
            ${MainSection()}
            ${CurrentDetailsSection()}
            ${ForecastSection()}
        </div>`;


    return (aboutElements);
}

function enterZip(){
    let zipCode = document.getElementById("zipCodeValue").textContent;
    console.log("Zip Code: " + zipCode);
}
