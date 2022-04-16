import { db } from "../../../../models";
import { log } from "../../../../utils/logger";
import { Schema } from "mongoose";
import { httpStatusCode } from "../../../../utils/httpStatusCode";
import { decryptData } from "../../../../utils/crypto";
import { getAccessToken, getRefreshToken } from "../../../../utils/jwt";

export const verifyUser = async ({ traceId, email, phone, username, password }: {
    traceId: string,
    email?: string,
    phone?: string,
    username?: string,
    password: string
}) => {
    log.info(`[${traceId}] [verifyUser] [START]`);
    try {

        let searchQuery = {};

        if (email) searchQuery = { email };

        if (phone) searchQuery = { phone };

        if (username) searchQuery = { username };

        const user = await db.user.findOne(searchQuery).lean();

        if (!user) {
            log.error(`[${traceId}] [verifyUser] [ERROR] User not found`);
            return {
                error: {
                    status: httpStatusCode.NOT_FOUND,
                    message: "User not found"
                }
            };
        }

        const encryptedData = user.userData;

        const data = decryptData({
            encryptedData,
            password
        });

        if (!data) {
            log.error(`[${traceId}] [verifyUser] [ERROR] Incorrect password`);
            return {
				error: {
					status: httpStatusCode.BAD_REQUEST,
					message: "Incorrect password"
				}
			};
        };

        const accessToken = getAccessToken(user);
        const refreshToken = getRefreshToken(user);

        log.info(`[${traceId}] [verifyUser] [END]`);
        return {
            data: {
                user,
                accessToken,
                refreshToken
            }
        };
    } catch (error) {
        const errorMessage = (error as Error).message || "No error description";
        log.error(`[${traceId}] [verifyUser] [ERROR] ${errorMessage}`);
        return { error };
    }
}