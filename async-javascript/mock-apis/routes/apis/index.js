'use strict'
const movies = require('../../data/movies.json')
const cars = require('../../data/cars.json');
const carsLarge = require('../../data/cars-large.json');

module.exports = async function (fastify, opts) {
  fastify.get('/cars/large', async function (request, reply) {
    reply.status(200).send(carsLarge)
  })

  fastify.get('/cars', async function (request, reply) {
    if (request.query.boom) {
      reply.status(500).send({ error: 'Something bad happened' })
      return
    }
    reply.status(200).send(cars)
  })

  fastify.get('/movies', async function (request, reply) {
    reply.status(200).send(movies)
  })

  fastify.get('/', async function (request, reply) {
    return {
      cars: '/cars',
      'cars-large': '/cars/large',
      movies: '/movies',
    }
  })
}
