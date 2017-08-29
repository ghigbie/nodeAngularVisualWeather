const yargs = require('yargs');
const axios = require('axios');

const apiKey = require('./apiKey/apiKey');

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
let formattedAddress  = ``;

let geocodeAddress = (inputAddress) => {
    let encodedAddress = encodeURIComponent(inputAddress);
    let baseURLAddress = `https://maps.googleapis.com/maps/api/geocode/json?address=`;
    let fullURLAddress = `${baseURLAddress}${encodedAddress}`;
    
    axios.get(fullURLAddress).then((response) => {
        if(response.data.status === 'ZERO_RESULTS'){
            throw new Error(`Unable to locate that address or zip code...\n Please enter a valid address or zip code.`);
        }
        formattedAddress = response.data. results[0].address;
        console.log(formattedAddress);
    
        const darkSkysURL = `https://api.darksky.net/forecast`;
        const apiKeyString = apiKey.apiKey;
        let latitude = response.data.results[0].geometry.lat;
        let longitude = response.data.results[0].geometry.lng;
        let fullRequestAddress = `${darkSkysURL}/${apiKeyString}/${latitude},${longitude}`;
        
    }).catch((e) => {
        if(e.code === 'ENOTFOUND'){
            console.log('Unable to connect to API servers');
        }else{
            console.log(e.message);
        }
    });
};

geocodeAddress(address);
