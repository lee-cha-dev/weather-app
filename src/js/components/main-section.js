
const MainSection = () => {
    let date = new Date();
    let day = weatherDataHandler.days[date.getDay()];

    const sec = `
        <section id='main-section' class='main-section'>
               <h1 class='current-place' id='current-place'>${day}</h1>
               <div id='main-wrapper' class='main-wrapper'>
                   <img id='weather-icon' src='https://openweathermap.org/img/wn/04d@4x.png' alt='WeatherIcon' />
                   <div id='main-details' class='main-details'>
                       <h1 id='current-temp'>46.63 °F</h1>
                       <h2 id='current-condition'>Overcast Clouds</h2>
                   </div>
               </div>
        </section>`;


    return (sec);
}