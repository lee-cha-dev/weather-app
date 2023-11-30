
let CurrentDetailsSection = () => {

    let sec =
        "<section class='current-details-section'>" +
        "   <hr class='line-break' />" +
        "   <div class='current-details-wrapper'>" +
                currentDetailTile("Humidity", "76%") +
                currentDetailTile("Wind", "5 mph") +
                currentDetailTile("Visibility", "1 Mile") +
                currentDetailTile("Air Quality", "Great") +
                currentDetailTile("Sunrise", "0730") +
                currentDetailTile("Sunset", "1930") +
        "   </div>" +
        "   <hr class='line-break' />" +
        "</section>"

    return (sec);
}