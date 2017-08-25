const yargs = require('yargs');

const geocode = require('./geocode/geocode');

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
    
// let apiAddress = `https://maps.googleapis.com/maps/api/geocode/json?address=`;
// let addressEncoded = encodeURIComponent(argv.address); //gets the address variablea and encodes it
// let addressDecoded = decodeURIComponent(addressEncoded); //decodes teh address to be more readable
// let apiFullAddress = `${apiAddress}${addressEncoded}`;

//console.log(`Address: ${addressDecoded}`);
let formattedAddress = ``;
let coordinates = geocode.geocodeAddress(argv.address);
console.log(coordinates);
//let longitude = coordinates.lng;
///let lattitude = coordinates.lat;

//console.log(coordinates);
// console.log(longitude);
// console.log(lattitude);