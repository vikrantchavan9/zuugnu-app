const { Client } = require('pg');
require('dotenv').config(); // Load .env file

const client = new Client({
     user: process.env.DB_USER || 'postgres',
     host: process.env.DB_HOST || 'localhost',
     database: process.env.DB_NAME,
     password: process.env.DB_PASSWORD,
     port: process.env.DB_PORT || 5432,
});

console.log('Testing connection with:', {
     user: client.user,
     db: client.database,
     host: client.host
});

client.connect()
     .then(() => {
          console.log('✅ SUCCESS: Connected to Postgres!');
          return client.end();
     })
     .catch(err => {
          console.error('❌ CONNECTION FAILED:', err.message);
     });