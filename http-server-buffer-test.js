const axios = require('axios');
function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
async function run() {
    let counter = 0;
    for(let at = 0; at < 5; at++) {
        let promises = [];
        let max = getRandomArbitrary(10000,20000);
        for(let i = 0; i < max; i++) {
            promises.push(
                axios.post('http://localhost:1234', {axios_test: true, stamp: new Date().getTime()})
            );
        }
        await Promise.all(promises).catch(error => console.log(error));
        counter += max;
        if (at % 50 === 0) {
            console.log('Current attempt ' + at);
        }        
    }    
    console.log('Sent ' + counter);
}

run();