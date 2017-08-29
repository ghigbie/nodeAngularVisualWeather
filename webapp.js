const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require ('./weather/weather');

alert('yo');
//let address = document.getElementById('InputAddress').value;
//let postAddress = document.getElementById('addressInput').innerHTML;
// let weatherOutput = document.getElementById('weatherOutput');
// let latitude = null;
// let longitude = null;
// let temperature = null;
// let feelsLike = null;
// let rainChance = null;
// let windSpeed = null;
// let ozone = null;
// let uvIndex = null;

// let writeAddress = (address) => {
    
// };

// let writeWeather = (weatherResultsObject) => {
//     temperature = weatherResultsObject.temperature; //will be printed to screen
//     feelsLike = weatherResultsObject.feelsLike; //will be printed to screen
//     rainChance = weatherResultsObject.feelsLike * 100; //will be printed to screen
//     windSpeed = weatherResultsObject.feelsLike; //will be printed to screen
//     ozone = weatherResultsObject.ozone; //will be printed to screen
//     uvIndex = weatherResultsObject.uvIndex;//will be printed to screen
//     weatherOutput.appendChild(`<h2>The temperature is: ${temperature} degrees Fahrenheit.<h2>`);
//     weatherOutput.appendChild(`<h2>It feels like ${feelsLike} degrees Fahrenheit.<h2>`);
//     weatherOutput.appendChild(`<h2>There is a ${rainChance} degrees.<h2>`);
//     weatherOutput.appendChild(`<h2>The wind speed is: ${rainChance} MpH.<h2>`);
//     weatherOutput.appendChild(`<h2>The UV Index is: ${uvIndex}.<h2>`);
// };
    
let getWeather = () => {
    let address = 80112//document.getElementById('InputAddress').value;
   // let postAddress = document.getElementById('weatherInput');
    geocode.geocodeAddress(address, (errorMessage, results) => {
        if(errorMessage){
            console.log(errorMessage);
        }else{
            address = `The weather for ${results.address} is:`;
            //postAddress.innerHTML = address; //this posts address to screen
            console.log(results.address);
            console.log(JSON.stringify(results, undefined, 2));
            let latitude = results.latitude;
            let longitude = results.longitude;
            weather.getWeather(latitude, longitude, (errorMessage, weatherResults) => {
                if(errorMessage){
                    console.log(errorMessage);
                }else{
                    //writeWeather(weatherResults);
                    let temperature = weatherResults.temperature; //will be printed to screen
                    let feelsLike = weatherResults.feelsLike; //will be printed to screen
                    let rainChance = weatherResults.rainChance* 100; //will be printed to screen
                    let windSpeed = weatherResults.windSpeed; //will be printed to screen
                    let ozone = weatherResults.ozone; //will be printed to screen
                    let uvIndex = weatherResults.uvIndex;//will be printed to screen
                    
                    alert('yo');
                    console.log(JSON.stringify(weatherResults, undefined, 2));
                    console.log(temperature, feelsLike, rainChance, windSpeed, ozone, uvIndex);
                }   
            });
        }
    });
};

getWeather();
