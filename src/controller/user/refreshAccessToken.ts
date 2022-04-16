import { Request, Response } from "express";
import { log } from "../../utils/logger";
import { v4 as uuid } from "uuid";
import { httpStatusCode } from "../../utils/httpStatusCode";
import { getAccessToken, verifyRefreshToken } from "../../utils/jwt";
import { User } from "../../models/user/user";
import { userCRUD } from "./utils/userCRUD";
import { FError } from "../../utils/error";

export const refreshAccessToken = async (req: Request, res: Response) => {
    const traceId = uuid();
    log.info(`[${traceId}] [refreshAccessToken] [START]`);
    try {
        const refreshToken = req.headers.refreshtoken as string;

		const payload = verifyRefreshToken(refreshToken) as User;

		const _id = payload._id;

		const { data, error } = await userCRUD.getUserById({
            traceId,
            _id
        });

        if (error) {
            const errorStatus =
                (error as FError)?.status || httpStatusCode.INTERNAL_SERVER_ERROR;
            const errorMessage = (error as Error).message || "No error description";
            log.error(
				`[${traceId}] [refreshAccessToken] [ERROR] ${errorMessage}`
			);
            return res.status(errorStatus).json({
                error: errorMessage
            });
        }

        const accessToken = getAccessToken(data);

        log.info(`[${traceId}] [refreshAccessToken] [END]`);
        return res.status(httpStatusCode.OK).json({
			data: {
				user: data,
				accessToken,
				refreshToken
			}
		});

    } catch (error) {
        const errorMessage = (error as Error).message || "No error description";
		log.error(`[${traceId}] [refreshAccessToken] [ERROR] ${errorMessage}`);
		return res
			.status(httpStatusCode.INTERNAL_SERVER_ERROR)
			.json({ error: errorMessage });
    }
}