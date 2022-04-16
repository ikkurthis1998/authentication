import express, { Request, Response } from 'express';
import { router } from './routes';
import * as secrets from './utils/secrets';
import { log } from "./utils/logger";
import mongoose from "mongoose";
import { httpStatusCode } from './utils/httpStatusCode';

const app = express();

log.info("[DB] [START] Connecting...");
mongoose
	.connect(secrets.dbUri, {
		dbName: "auth"
	})
	.then(() => {
        log.info("[DB] [END] Connected");
        app.listen(secrets.port, () => {
			log.success(`[Server] Listening on port ${secrets.port}`);
		});
	})
	.catch((error) => {
		log.error(`[dbConnection] [ERROR] ${error.message}`);
	});

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.status(httpStatusCode.OK).json({
        data: "It's alive!"
    });
});

router.map(route => {
    app.use(route.path, route.router);
});