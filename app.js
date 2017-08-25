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
    
//console.log(argv);

let apiAddress = `https://maps.googleapis.com/maps/api/geocode/json?address=`;
let addressEncoded = encodeURIComponent(argv.address); //gets the address variablea and encodes it
let addressDecoded = decodeURIComponent(addressEncoded); //decodes teh address to be more readable
let inputAddress = `${apiAddress}${addressEncoded}`;

//console.log(`Address: ${addressDecoded}`);
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