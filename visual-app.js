// const yargs = require('yargs');
const axios = require('axios');

const apiKey = require('./apiKey/apiKey');

// const argv = yargs
//     .options({
//         a:{
//             demand: true,
//             alias: 'address',
//             describe: 'Address to fetch weather for',
//             string: true
//         }
//     })
//     .help()
//     .alias('help', 'h')
//     .argv;

// let address = argv.address;

//these are the varaibles that I want to show to the page
let formattedAddress  = ``;
let temperature = null;
let feelsLike = null;
let rainChance = null;
let windSpeed = null;
let ozone = null;
let uvIndex = null;

let geocodeAddress = (inputAddress) => {
    let encodedAddress = encodeURIComponent(inputAddress);
    let URLAddress = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;
    
    axios.get(URLAddress).then((response) => {
        if(response.data.status === 'ZERO_RESULTS'){
            throw new Error(`Unable to locate that address or zip code...\n Please enter a valid address or zip code.`);
        }
        formattedAddress = response.data.results[0].formatted_address;
        console.log(formattedAddress);
    
        const darkSkysURL = `https://api.darksky.net/forecast`;
        const apiKeyString = apiKey.apiKey;
        let latitude = response.data.results[0].geometry.location.lat;
        let longitude = response.data.results[0].geometry.location.lng;
        let fullURLWeather = `${darkSkysURL}/${apiKeyString}/${latitude},${longitude}`;
        console.log(fullURLWeather);
        return axios.get(fullURLWeather);
        
    }).then((response) => {
        
        temperature =  response.data.currently.temperature;
        feelsLike = response.data.currently.apparentTemperature;
        rainChance = response.data.currently.precipProbability * 100;
        windSpeed = response.data.currently.windSpped;
        ozone = response.data.currently.letozone;
        uvIndex = response.data.currently.uvIndex;
        
        
        console.log(`The temperature is: ${temperature}, but it feels like ${feelsLike}.`);
        console.log(`The chance of rain is ${rainChance}.`);
        console.log(`The UV Index is ${uvIndex}.`);
    }).catch((e) => {
        if(e.code === 'ENOTFOUND'){
            console.log('Unable to connect to API servers');
        }else{
            console.log(e.message);
        }
    });
};

geocodeAddress(address);

let postDataToPage = (add, temp, feel, rain, wind, ozone, uv) => {
    let addressDiv = document.getElementById('post-address');
    let addressDisplay = `<h2>Current Address: ${add}</h2>`;
    addressDiv.appendChild(addressDisplay);
    
    let weatherDiv = document.getElementById('post-weather');
    let temperatureDisplay = `<h2>The current temperature is ${temp} degrees Fahrenheit.</h2>`;
    let feelsLikeDisplay = `<h2>However, it feels like ${feel} degrees Fahrenheit outside.</h2>`;
    let rainChanceDisplay = `<h2>The chance of rain is ${rain}</h2>`;
    let windSpeedDisplay = `<h2>The current wind speed is ${wind} mph.</h2>`;
    let ozoneDisplay = `<h2>The ozone level is ${ozone}.</h2>`;
    let uvIndexDisplay = `<h2>The UV Index is ${uvIndex}.</h2>`;
 
    let weatherData = [temperatureDisplay, feelsLikeDisplay, rainChanceDisplay, windSpeedDisplay, ozoneDisplay, uvIndexDisplay];
    for(let i = 0; i < weatherData.length; i++){
        weatherDiv.appendChild(weatherData[i]);
    }
};

postDataToPage('a', 'b', 'c', 'd', 'e', 'f', 'g');