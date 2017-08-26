const request = require('request');


let callWeather = (apiAddress, callback) => {
    request(
        {
            url: apiAddress,
            json: true
        },
    (error, response, body) => {
        if(error){
            callback(`Unable to connect to servers.`);
        }else if(body.status === 404){
            callback(`Unable to locate this location...Pleaese try a different location.`);
        }else if(body.status === 200){
            callback(undefined, {
                temperature: body.currently.temperature,
                rainChance: body.currently.precipProbability,
                windSpeed: body.currently.windSpped,
                ozone: body.currently.ozone,
                uvIndex: body.currently.uvIndex
            });

            console.log(body.currently.temperature);
        }
        
    });
};

module.exports = {
    callWeather
};