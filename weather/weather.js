const request = require('request');

const apiKey = require('./../apiKey/apiKey');
const darkAPI = `https://api.darksky.net/forecast`;
const apiKeyString = apiKey.apiKey;

let getWeather = (latitude, longitude, callback) => {
    console.log(`Fetching weather...`);
    request(
        {
            url: `${darkAPI}/${apiKeyString}/${latitude},${longitude}`,
            json: true
        },
        
        (error, response, body) => {
            if(!error && response.statusCode === 200){
                let temperature = body.currently.temperature;
                let feelsLike = body.currently.apparentTemperature;
                callback(`The temperature is: ${temperature}, but it feels like ${feelsLike}.`);
                callback(undefined, {
                    temperature: body.currently.temperature,
                    feelsLike: body.currently.apparentTemperature,
                    rainChance: body.currently.precipProbability *100,
                    windSpeed: body.currently.windSpped,
                    ozone: body.currently.ozone,
                    uvIndex: body.currently.uvIndex
                });
            }else{
                console.log(`Unable fetch weather.`);
            }
    });
};

module.exports = {
    getWeather
};