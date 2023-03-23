import { bookSchema, errorSchema } from '../schemas/index.js'
import { randomUUID } from 'node:crypto'

export default async function (fastify, opts) {
  fastify.addSchema({
    $id: 'book',
    ...bookSchema
  })

  fastify.addSchema({
    $id: 'error',
    ...errorSchema
  })

  fastify.get(
    '/books',
    {
      schema: {
        response: {
          200: {
            description: 'Returns a list of books',
            type: 'array',
            items: { $ref: 'book#' }
          },
          500: { description: 'Returns an error', $ref: 'error#' }
        }
      }
    },
    async (request, reply) => {
      const client = await fastify.pg.connect()
      try {
        const { rows: books } = await client.query('SELECT id, title, author, published_at AS "publishedAt" FROM books')
        console.log(books)
        reply.send(books)
      } catch (error) {
        reply
          .status(500)
          .send({ code: 500, message: `An error ocurred: ${error.message}` })
      } finally {
        client.release()
      }
    }
  )

  fastify.post(
    '/books',
    {
      schema: {
        body: { $ref: 'book#', required: [ 'author', 'title' ] },
        response: {
          201: {
            description: 'Returns the book that has been created',
            $ref: 'book#'
          },
          500: { description: 'Returns an error', $ref: 'error#' }
        }
      }
    },
    async (request, reply) => {
      const { title, author } = request.body
      const id = randomUUID()

      const client = await fastify.pg.connect()
      try {
        const { rows: books } = await client.query(
          'INSERT INTO books(id, title, author) VALUES($1, $2, $3) RETURNING *',
          [id, title, author]
        )
        const [ newBook ] = books;
        reply.code(201).send(newBook)
      } catch (error) {
        reply
          .status(500)
          .send({ code: 500, message: `An error ocurred: ${error.message}` })
      } finally {
        client.release()
      }
    }
  )

  fastify.get('/', async function (request, reply) {
    reply.status(301).redirect('/api-docs')
  })
}
