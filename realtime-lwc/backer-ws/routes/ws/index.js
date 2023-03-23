'use strict'

const { faker } = require('@faker-js/faker')

const delay = (ms) => new Promise((resolve) => {
  setTimeout(resolve, ms)
})

module.exports = async function (fastify, opts) {
  fastify.get('/', { websocket: true }, async function (connection, request) {
    while (true) {
      const message = {
        name: faker.name.firstName(),
        amount: faker.finance.amount(500, 3000)
      }
      connection.socket.send(JSON.stringify(message));
      await delay(1000);
    }
  })
}
