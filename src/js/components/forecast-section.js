
let ForecastSection = () => {
    let sec = `
        <section class='forecast-section' id='forecast-section'>
           <div class='forecast-section-wrapper'>
                ${forecastTile("one")}
                ${forecastTile("two")}
                ${forecastTile("three")}
                ${forecastTile("four")}
                ${forecastTile("five")}
                ${forecastTile("six")}
                ${forecastTile("seven")}
                ${forecastTile("eight")}
           </div>
        </section>`;


    return (sec);
}