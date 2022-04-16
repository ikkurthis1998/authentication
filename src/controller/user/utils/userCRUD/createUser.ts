import { db } from "../../../../models";
import { checkPasswordStrength } from "../../../../utils/checkPasswordStrength";
import { encryptData } from "../../../../utils/crypto";
import { httpStatusCode } from "../../../../utils/httpStatusCode";
import { log } from "../../../../utils/logger";

export const createUser = async ({ traceId, username, firstName, lastName, email, password }: {
    traceId: string,
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string
}) => {
    log.info(`[${traceId}] [createUser] [START]`);
    try {

        let user = await db.user.findOne({ username });
        
        if (!user) {
            user = await db.user.findOne({ email });
        }

        if (user) {
            log.error(`[${traceId}] [createUser] [ERROR] User already exists`);
            return {
                error: {
                    status: httpStatusCode.BAD_REQUEST,
                    message: "User already exists"
                }
            };
        }

        const { data, error } = checkPasswordStrength({ password, traceId });

        if (error) {
            log.error(`[${traceId}] [createUser] [ERROR] ${error.message}`);
            return { error };
        }

        const userData = encryptData({
            data: JSON.stringify({
                username,
                firstName,
                lastName
            }),
            password
        });

        user = await new db.user({
            username,
            firstName,
            lastName,
            email,
            userData
        }).save();

        log.info(`[${traceId}] [createUser] [END]`);
        return {
            data: user
        };
    } catch (error) {
        const errorMessage = (error as Error).message || "No error description";
        log.error(`[${traceId}] [createUser] [ERROR] ${errorMessage}`);
        return { error };
    }
}