const yargs = require('yargs');
const axios = require('axios')

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
        if(response.data.status === 'ZERO_RESULTS'){
            throw new Error(`Unable to locate that address or zip code...\n Please enter a valid address or zip code.`);
        }
 
        console.log(response.data);
    }).catch((e) => {
        if(e.code === 'ENOTFOUND'){
            console.log('Unable to connect to API servers');
        }else{
            console.log(e.message);
        }
    });
}

geocodeAddress(address);
