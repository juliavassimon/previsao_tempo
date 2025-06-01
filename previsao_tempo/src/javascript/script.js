document.querySelector('#search').addEventListener('submit', async (event) => {
    event.preventDefault();
    const cityName = document.querySelector('#city_name').value;

    if (!cityName) {
        document.querySelector("#weather").classList.remove('show');
        showAlert('Você precisa digitar uma cidade!');
        return
    }

    const senhaApi = '114f3e120a107b1d82480b4ca3fdeef5';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${senhaApi}&units=metric&lang=pt_br`;

    const results = await fetch(apiUrl);
    const json = await results.json();

    if (json.cod === 200) {
        showInfos({
            city: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempMax: json.main.temp_max,
            tempMin: json.main.temp_min,
            description: json.weather[0].description,
            tempIcon: json.weather[0].icon,
            windSpeed: json.wind.speed,
            humidity: json.main.humidity,
        });
    } else {
        document.querySelector("#weather").classList.remove('show');
        showAlert(`Não foi possível localizar... <img src="src/imagem/404.svg">`);
    }
    
});

function showInfos(json) {
    showAlert('');
    document.querySelector('#weather').classList.add("show");
    document.querySelector('#title').innerHTML = `${json.city}, ${json.country}`; 
    document.querySelector('#tempo_value').innerHTML = `${json.temp.toFixed(1).toString().replace('.',',')} <sup>°C</sup>`; 
    document.querySelector('#tempo_description').innerHTML = `${json.description}`; 
    document.querySelector('#temp_img').setAttribute('src',`https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)
    document.querySelector('#temp_max').innerHTML = `${json.tempMax.toFixed(1).toString().replace('.',',')} <sup>°C</sup>`; 
    document.querySelector('#temp_min').innerHTML = `${json.tempMin.toFixed(1).toString().replace('.',',')} <sup>°C</sup>`; 
    document.querySelector('#wind').innerHTML = `${json.windSpeed}Km/h`; 
    document.querySelector('#humidity').innerHTML = `${json.humidity}%`; 



}

function showAlert(msg) {
    document.querySelector('#alert').innerHTML = msg;
}
