const axios = require('axios');
const faker = require('faker');
function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
async function run() {
    let counter = 0;
    for(let at = 0; at < 100; at++) {
        let promises = [];
        let max = getRandomArbitrary(5000,10000);
        for(let i = 0; i < max; i++) {
            promises.push(
                axios.post('http://localhost:1234', {
                    country: faker.address.country(),
                    city: faker.address.city(),
                    state: faker.address.state(),
                    zipCode:  faker.address.zipCode(),
                    product: faker.commerce.product(),
                    price: faker.commerce.price(),
                    color: faker.commerce.color(),
                    stamp: new Date().getTime(),
                })
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