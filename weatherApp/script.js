const apikey = '3265874a2c77ae4a04bb96236a642d2f';

const url = (location) =>
`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apikey}`;

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

async function getWeatherByLocation(location) {
    const resp = await fetch(url(location), {
        origin: 'cors'
    });

    const respData = await resp.json();

    addWeatherToPage(respData);

    console.log(respData);

}

let loc = "mangalore"



function addWeatherToPage(data){

    if(data === undefined){
        return 0;
    }else{
    const temp = KtoC(data.main.temp);
    const weather = document.createElement('div');
    weather.classList.add('weather');

    weather.innerHTML = `
        <small>There are</small>
        <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${temp}°C <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h2>
        <p>in <span class="loc">${loc}<span></p>
        <small class="type">${data.weather[0].main}</small>

    `;

    main.appendChild(weather);

    }


}

function KtoC(K){
    return (K - 273.15).toFixed(2);
}


if(loc){
    getWeatherByLocation(loc);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    loc = search.value;

    console.log(loc)

    if(loc){
        getWeatherByLocation(loc);
        search.value = ''
    }

})