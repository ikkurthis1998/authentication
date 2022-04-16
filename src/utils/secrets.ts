import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 3000;

const dbUri = process.env.DB_URI || 'mongodb://localhost:27017/';

export {
    port,
    dbUri
}