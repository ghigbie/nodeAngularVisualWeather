const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require ('./weather/weather');

let address = ``;
let temperature = null;
let feelsLike = null;
let rainChance = null;
let windSpeed = null;
let ozone = null;
let uvIndex = null;

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;
    
let getWeather = () => {
    geocode.geocodeAddress(argv.address, (errorMessage, results) => {
        if(errorMessage){
            console.log(errorMessage);
        }else{
            address = results.address //will be printed to screen
            console.log(results.address);
            console.log(JSON.stringify(results, undefined, 2));
            let latitude = results.latitude;
            let longitude = results.longitude;
            weather.getWeather(latitude, longitude, (errorMessage, weatherResults) => {
                if(errorMessage){
                    console.log(errorMessage);
                }else{
                    temperature = weatherResults.temperature; //will be printed to screen
                    feelsLike = weatherResults.feelsLike; //will be printed to screen
                    rainChance = weatherResults.feelsLike * 100; //will be printed to screen
                    windSpeed = weatherResults.feelsLike; //will be printed to screen
                    ozone = weatherResults.ozone; //will be printed to screen
                    uvIndex = weatherResults.uvIndex;//will be printed to screen
                    console.log(JSON.stringify(weatherResults, undefined, 2));
                }   
            });
        }
    });
};


