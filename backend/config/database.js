const fs = require('fs')

module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'postgres',
        host: env('DB_HOST', 'localhost'),
        port: env.int('DB_PORT', 5432),
        database: env('DB_NAME', 'strapi'),
        username: env('DB_USERNAME', 'strapi'),
        password: env('DB_PASSWORD', 'strapi'),
        schema: env('DATABASE_SCHEMA', 'public'), // Not Required
        ssl: {
          ca: fs.readFileSync(`${__dirname}/ca-certificate.crt`).toString(),
        },
      },
      options: {
        ssl: env.bool('DATABASE_SSL', false),
      },
    },
  },
});