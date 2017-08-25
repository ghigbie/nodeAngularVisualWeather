const request = require('express');

let apiAddress = `https://maps.googleapis.com/maps/api/geocode/json?address=`;
let address = `9601%20S%20Meridian%20Blvd,%20Englewood,%20CO%2080112`;
let inputAddress = `${apiAddress}${address}`;

//request takes two arguments, the first is an options object and the second is a callback which is executed after the api call
request(
        { 
    url: inputAddress,
    json: true //this property converts json string into json object
    }, 
    
    (error, response, body) => {
        console.log(body);
})