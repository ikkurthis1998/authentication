import express from 'express';
import * as secrets from './utils/secrets';

const app = express();

app.listen(secrets.port, () => {
    console.log(`Server is listening on port ${secrets.port}`);
});