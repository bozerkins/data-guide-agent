const faker = require('faker');
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: __dirname + '/samples/sample.log' })
  ],
});

let items = 0;
for(let i = 0; i < 1000; i++) {
    items++;
    if (items % 100 === 0) {
        console.log(`Generated ${items} items`);
    }
    logger.info({
        country: faker.address.country(),
        city: faker.address.city(),
        state: faker.address.state(),
        zipCode:  faker.address.zipCode(),
        product: faker.commerce.product(),
        price: faker.commerce.price(),
        color: faker.commerce.color(),
    });
}