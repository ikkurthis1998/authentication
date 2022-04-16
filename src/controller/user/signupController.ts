import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { FError } from "../../utils/error";
import { httpStatusCode } from "../../utils/httpStatusCode";
import { log } from "../../utils/logger";
import { userCRUD } from "./utils/userCRUD";

export const signupController = async (req: Request, res: Response) => {
    const traceId = uuid();
    log.info(`[${traceId}] [signupController] [START]`);

    try {

        const { username, firstName, lastName, email, password } = req.body;

        const { data, error } = await userCRUD.createUser({
            traceId,
            username,
            firstName,
            lastName,
            email,
            password
        });

        if (error) {
            const errorStatus = (error as FError)?.status || httpStatusCode.INTERNAL_SERVER_ERROR;
            const errorMessage = (error as Error).message || "No error description";
            log.error(`[${traceId}] [signupController] [ERROR] ${errorMessage}`);
            return res.status(errorStatus).json({
                error: errorMessage
            });
        }

        log.info(`[${traceId}] [signupController] [END]`);
        return res.status(httpStatusCode.CREATED).json({
            data
        });

    } catch (error) {
        const errorMessage = (error as Error).message || "No error description";
        log.error(`[${traceId}] [signupController] [ERROR] ${errorMessage}`);
        return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({ error: errorMessage });
    }
}