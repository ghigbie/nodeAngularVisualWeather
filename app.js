const request = require('request');
const yargs = require('yargs');

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
    

let apiAddress = `https://maps.googleapis.com/maps/api/geocode/json?address=`;
let address = `9601%20S%20Meridian%20Blvd,%20Englewood,%20CO%2080112`;
let inputAddress = `${apiAddress}${address}`;

let formattedAddress = ``;
let longitude = null;
let lattitude = null;

//request takes two arguments, the first is an options object and the second is a callback which is executed after the api call
request(
        { 
    url: inputAddress,
    json: true //this property converts json string into json object
}, (error, response, body) => {
        console.log(JSON.stringify(body, undefined, 2));
        formattedAddress = body.results[0].formatted_address;
        longitude = body.results[0].geometry.location.lng;
        lattitude = body.results[0].geometry.location.lat;
        console.log(`Address: ${formattedAddress}`);
        console.log(`Longitue: ${longitude}`);
        console.log(`Lattitude: ${lattitude}`);
});

setTimeout( () => {
console.log('\\\\\\\\\\\\\\\\');
console.log(`Longitue: ${longitude}`);
console.log(`Lattitude: ${lattitude}`);
}, 5000);