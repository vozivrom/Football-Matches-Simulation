import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

export default connection;
