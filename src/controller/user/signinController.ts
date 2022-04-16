import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { FError } from "../../utils/error";
import { httpStatusCode } from "../../utils/httpStatusCode";
import { log } from "../../utils/logger";
import { userCRUD } from "./utils/userCRUD";

export const signinController = async (req: Request, res: Response) => {
    const traceId = uuid();
    log.info(`[${traceId}] [signinController] [START]`);

    try {

        const { username, email, phone, password } = req.body;

        const { data, error } = await userCRUD.verifyUser({
            traceId,
            username,
            email,
            phone,
            password
        });

        if (error) {
            const errorStatus = (error as FError)?.status || httpStatusCode.INTERNAL_SERVER_ERROR;
            const errorMessage = (error as Error).message || "No error description";
            log.error(`[${traceId}] [signinController] [ERROR] ${errorMessage}`);
            return res.status(errorStatus).json({
                error: errorMessage
            });
        }

        log.info(`[${traceId}] [signinController] [END]`);
        return res.status(httpStatusCode.CREATED).json({
            data
        });

    } catch (error) {
        const errorMessage = (error as Error).message || "No error description";
        log.error(`[${traceId}] [signinController] [ERROR] ${errorMessage}`);
        return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({ error: errorMessage });
    }
}