const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options({
        a:{
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

let address = argv.address;

let geocodeAddress = (inputAddress) => {
    let encodedAddress = encodeURIComponent(inputAddress);
    let baseURLAddress = `https://maps.googleapis.com/maps/api/geocode/json?address=`;
    let fullURLAddress = `${baseURLAddress}${encodedAddress}`;
    
    axios.get(fullURLAddress).then((response) => {
        console.log(response.data);
    }).catch((e) => {
       console.log(e); 
    });
}

geocodeAddress(address);
