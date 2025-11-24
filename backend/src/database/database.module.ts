import { Module, Global } from '@nestjs/common';
import { Pool } from 'pg';

// Using a custom provider to inject the PG Pool anywhere
const dbProvider = {
     provide: 'DATABASE_CONNECTION',
     useFactory: async () => {
          return new Pool({
               user: process.env.DB_USER || 'postgres',
               host: process.env.DB_HOST || 'localhost',
               database: process.env.DB_NAME || 'your_db_name',
               password: process.env.DB_PASSWORD || 'your_password',
               // Fix: Provide a fallback string inside parseInt so it never receives undefined
               port: parseInt(process.env.DB_PORT || '5432', 10),
          });
     },
};

@Global() // Makes the DB connection available everywhere without importing
@Module({
     providers: [dbProvider],
     exports: [dbProvider],
})
export class DatabaseModule { }