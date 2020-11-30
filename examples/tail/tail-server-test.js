const fs = require('fs');
const faker = require('faker');

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

let counter = 0;
for(let at = 0; at < 1000; at++) {
    let max = getRandomArbitrary(1000,3000);
    for(let i = 0; i < max; i++) {
        fs.appendFileSync(__dirname + '/samples/tail-file', JSON.stringify({
            country: faker.address.country(),
            city: faker.address.city(),
            state: faker.address.state(),
            zipCode:  faker.address.zipCode(),
            product: faker.commerce.product(),
            price: faker.commerce.price(),
            color: faker.commerce.color(),
            stamp: new Date().getTime(),
        }) + "\n");
    }
    counter += max;
    if (at % 50 === 0) {
        console.log('Current attempt ' + at);
    }        
}    
console.log('Sent ' + counter);
    