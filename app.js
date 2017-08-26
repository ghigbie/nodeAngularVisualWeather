const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require ('./weathr/weather');
const apiKey = require('./apiKey');

const darkAPI = `https://api.darksky.net/forecast`;
let latitude = ``;
let longitude = ``;
let fullAPIRequest = ``;

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
        console.log(JSON.stringify(results, undefined, 2));
        latitude = results.latitude;
        longitude = results.longitude;
        let fullAPIRequest = `${darkAPI}/${apiKey.apiKey}/${latitude},${longitude}`;
        console.log(`Full API request: ${fullAPIRequest}`);
        weather.getWeather(`${darkAPI}/${apiKey.apiKey}/39.5835785,-104.8571368` , (errorMessage, results) =>{
            if(errorMessage){
                console.log('boo');
            }else{
                console.log(JSON.stringify(results, undefined,2));
                console.log("temp" + results.temperature);
            }
        });
        
    }
});

const request = require('request');

request(
    {
        url: `${darkAPI}/${apiKey.apiKey}/39.5835785,-104.8571368`,
        json: true
    },
    (error, response, body) => {
        if(!error && response.statusCode === 200){
            console.log(`The temperature is: ${body.currently.temperature}`);
        }else{
            console.log(`Unable fetch weather.`);
        }
    });
