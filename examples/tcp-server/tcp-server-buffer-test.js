const net = require('net');
const faker = require('faker');

var client = new net.Socket();
client.connect(2345, '127.0.0.1', async function() {
	console.log('Connected');
    await run(client);
    client.destroy();
});

client.on('data', function(data) {
	console.log('Received: ' + data);
});

client.on('close', function() {
	console.log('Connection closed');
});

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

async function run(client) {
    let counter = 0;
    for(let at = 0; at < 1000; at++) {
        let max = getRandomArbitrary(1000,3000);
        for(let i = 0; i < max; i++) {
            client.write(JSON.stringify({
                country: faker.address.country(),
                city: faker.address.city(),
                state: faker.address.state(),
                zipCode:  faker.address.zipCode(),
                product: faker.commerce.product(),
                price: faker.commerce.price(),
                color: faker.commerce.color(),
                stamp: new Date().getTime(),
            }));
        }
        counter += max;
        if (at % 50 === 0) {
            console.log('Current attempt ' + at);
        }        
    }    
    console.log('Sent ' + counter);
}