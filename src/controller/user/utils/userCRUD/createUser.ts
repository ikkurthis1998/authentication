import { db } from "../../../../models";
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
        const user = await new db.user({
            username,
            firstName,
            lastName,
            email,
            // userData
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