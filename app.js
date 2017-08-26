const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require ('./weather/weather');

let address = ``;
let temperature = null;
let fellsLike = null;
let rainChance = null;
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
    
geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if(errorMessage){
        console.log(errorMessage);
    }else{
        console.log(results.address);
        console.log(JSON.stringify(results, undefined, 2));
        let latitude = results.latitude;
        let longitude = results.longitude;
        weather.getWeather(latitude, longitude, (errorMessage, weatherResults) => {
            if(errorMessage){
                console.log(errorMessage);
            }else{
                console.log(JSON.stringify(weatherResults, undefined, 2));
            }   
        });
    }
});


