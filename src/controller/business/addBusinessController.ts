import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { FError } from "../../utils/error";
import { httpStatusCode } from "../../utils/httpStatusCode";
import { log } from "../../utils/logger";
import { businessCRUD } from "./utils/businessCRUD";

export const addBusinessController = async (req: Request, res: Response) => {
    const traceId = uuid();
    log.info(`[${traceId}] [addBusinessController] [START]`);

    try {

        const { name, code, logo } = req.body;

        const { data, error } = await businessCRUD.createBusiness({
            traceId,
            name,
            code,
            logo
        });

        if (error) {
            const errorStatus = (error as FError)?.status || httpStatusCode.INTERNAL_SERVER_ERROR;
            const errorMessage = (error as Error).message || "No error description";
            log.error(`[${traceId}] [addBusinessController] [ERROR] ${errorMessage}`);
            return res.status(errorStatus).json({
                error: errorMessage
            });
        }

        log.info(`[${traceId}] [addBusinessController] [END]`);
        return res.status(httpStatusCode.CREATED).json({
            data
        });

    } catch (error) {
        const errorMessage = (error as Error).message || "No error description";
        log.error(`[${traceId}] [addBusinessController] [ERROR] ${errorMessage}`);
        return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({ error: errorMessage });
    }
}