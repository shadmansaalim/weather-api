//API KEY
const API_KEY = '1665b5a80355a7212f84b86c9e37b921';

//Function to fetch data from API according to user input
const loadTemperature = async () => {
    const userInput = document.getElementById('user-input');
    const userCity = userInput.value;
    userInput.value = '';
    url = `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&appid=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    displayData(data);
}

//Container to show output result
const container = document.getElementById('container');

//Function to display data from API to UI
const displayData = data => {
    console.log(data);
    container.textContent = '';
    const div = document.createElement('div');
    if (data.cod == '404') {
        div.classList.add("mt-0", "mt-md-5");
        div.innerHTML = `
        <h2><i class="fas fa-exclamation-triangle"></i> City Not Found</h2>
        `
        container.appendChild(div);
    }
    if (data.cod == '400') {
        div.classList.add("mt-0", "mt-md-5");
        div.innerHTML = `
        <h2><i class="fas fa-exclamation-triangle"></i> Please enter a location for weather</h2>
        `
        container.appendChild(div);
    }
    else {
        div.classList.add("mt-5", "mt-md-0");
        div.innerHTML = `
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="" >
        <h1>${data.name}</h1>
        <h3><span>${Math.round(data.main.temp - 273.15)}</span>&deg;C</h3>
        <h1 class="lead">${data.weather[0].main}</h1>
        `
        container.appendChild(div);
    }
}