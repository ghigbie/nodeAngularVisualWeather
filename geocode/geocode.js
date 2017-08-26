const request = require('request');

let geocodeAddress = (inputAddress, callback) => {
    let apiAddress = `https://maps.googleapis.com/maps/api/geocode/json?address=`;
    let addressEncoded = encodeURIComponent(inputAddress); //gets the address variablea and encodes it
    let addressDecoded = decodeURIComponent(addressEncoded); //decodes the address to be more readable
    let apiFullAddress = `${apiAddress}${addressEncoded}`;
    request(
        { 
            url: apiFullAddress,
            json: true //this property converts json string into json object
        }, 
    (error, response, body) => {
        if(error){
            callback(`Unable to connect to servers.`); //this line becomes the error message
        }else if(body.status === 'ZERO_RESULTS'){
            callback(`Unable to locate that address or zip code...\n Please enter a valid address or zip code.`); //this line beomes the error message
        }else if(body.status === 'OK'){
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });
        }
    });
};

module.exports = {
    geocodeAddress
};
