export const bookSchema = {
  description: 'Represents a book',
  type: 'object',
  properties: {
    id: { type: 'string', format: 'uuid' },
    title: { type: 'string' },
    author: { type: 'string' },
    publishedAt: { type: 'string', format: 'date-time' }
  },
  required: ['title', 'author']
}

export const errorSchema = {
  description: 'Represents an error',
  type: 'object',
  properties: {
    code: { type: 'integer', format: 'int32' },
    message: { type: 'string' }
  },
  required: ['code', 'message']
}
