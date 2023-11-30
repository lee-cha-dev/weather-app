
let currentDetailTile = (id, value) => {
    let elemId = "current-detail-tile-" + id;
    let nameId = "detail-tile-name-" + id;
    let valueId = "detail-tile-value-" + id;

    let tile =
        "<div class='current-detail-tile' id='" + elemId + "'>" +
        "   <div class='detail-tile-wrapper'>" +
        "       <p class='detail-tile-name' id='" + nameId + "'>" + id + "</p>" +
        "       <p class='detail-tile-value' id='" + valueId + "'>" + value + "</p>" +
        "   </div>" +

        "</div>"

    return (tile);
}