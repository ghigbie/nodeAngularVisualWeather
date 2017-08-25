const request = require('request');

// let formattedAddress = ``;
// let coordinates = {};
// let longitude = null;
// let lattitude = null;


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
            callback(`Unable to connect to servers.`);
        }else if(body.status === 'ZERO_RESULTS'){
            callback(`Unable to locate that address or zip code...\n Please enter a valid address or zip code.`);
        }else if(body.status === 'OK'){
            console.log(JSON.stringify(body, undefined, 2));
            let longitude = body.results[0].geometry.location.lng;
            let lattitude = body.results[0].geometry.location.lat;
            console.log(`Address: ${addressDecoded}`);
            console.log(`Longitue: ${longitude}`);
            console.log(`Lattitude: ${lattitude}`);
            let coordinates = {
                lng: longitude,
                lat: lattitude
            };
            return coordinates;
            
        }
    });
};

module.exports = {
    geocodeAddress
};
