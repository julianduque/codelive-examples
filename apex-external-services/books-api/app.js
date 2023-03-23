import path from 'path'
import dotenv from 'dotenv'
import Swagger from '@fastify/swagger'
import SwaggerUI from '@fastify/swagger-ui'
import PostgresDb from '@fastify/postgres'
import AutoLoad from '@fastify/autoload'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Pass --options via CLI arguments in command to enable these options.
export const options = {}

// Load environment variables from .env file
dotenv.config()

export default async function (fastify, opts) {
  // Enable Postgres Plugin
  fastify.register(PostgresDb, {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  })
  // Enable Swagger (OpenAPI) plugins
  fastify.register(Swagger, {
    openapi: {
      info: {
        title: 'Books API',
        description: 'An external API to manage a book store',
        version: '1.0.0'
      }
    },
    refResolver: {
      buildLocalReference (json, baseUri, fragment, i) {
        return json.$id || `def-${i}`
      }
    }
  })
  fastify.register(SwaggerUI, {
    routePrefix: '/api-docs'
  })

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })
}
