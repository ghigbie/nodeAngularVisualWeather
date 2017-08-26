const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const apiKey = require('./apiKey');

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
    
geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if(errorMessage){
        console.log(errorMessage);
    }else{
        console.log(JSON.stringify(results, undefined, 2));
    }
});

const apiKeyNum = apiKey.apiKey;
const darkAPI = `https://api.darksky.net/forecast`;

let latitude = ``;
let longitude = ``;
let fullAPIRequest = `${darkAPI}/${apiKeyNum}/${latitude}/${longitude}`;