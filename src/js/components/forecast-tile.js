
let forecastTile = (id) => {
    let elemId = "forecast-tile-" + id;
    let highId = "forecast-tile-high-" + id;
    let lowId = "forecast-tile-low-" + id;
    let iconId = "forecast-tile-icon-" + id;
    let conditionId = "forecast-tile-condition-" + id;
    let dayId = "forecast-tile-day-" + id;

    let tile =
        "<div class='forecast-tile' id='" + elemId + "'>" +
        "   <div class='forecast-tile-wrapper'>" +
        "       <p id='" + dayId + "'>Saturday</p>" +
        "       <img " +
        "           id='" + iconId + "'" +
        "           src='https://openweathermap.org/img/wn/04d@4x.png'" +
        "           alt='forecast-icon'" +
        "       />" +
        "       <div class='forecast-temp-range'>" +
        "           <p>H: </p>" +
        "           <p class='forecast-tile-high' id='" + highId + "'>78</p>" +
        "       </div>" +
        "       <div class='forecast-temp-range'>" +
        "           <p>L: </p>" +
        "           <p class='forecast-tile-low' id='" + lowId + "'>62</p>" +
        "       </div>" +
        "       <p class='forecast-tile-condition' id='" + conditionId + "'>Cloudy with Rain</p>" +
        "   </div>" +
        "</div>"

    return (tile);
}