const request = require('request');

const apiKey = require('./apiKey/apiKey');
const darkAPI = `https://api.darksky.net/forecast`;

let getWeather = (latitude, longitude, callback) => {
    console.log(`Fetching weather...`);
    request(
        {
            url: `${darkAPI}/${apiKey}/${latitude},${longitude}`,
            json: true
        },
        (error, response, body) => {
            if(!error && response.statusCode === 200){
                let temperature = body.currently.temperature;
                let feelsLike = body.currently.apparentTemperature;
                callback(`The temperature is: ${temperature}, bit it feels like ${feelsLike}.`);
            }else{
                console.log(`Unable fetch weather.`);
            }
        });

};

module.exports = {
    getWeather
};