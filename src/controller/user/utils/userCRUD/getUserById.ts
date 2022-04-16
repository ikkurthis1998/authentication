import { db } from "../../../../models";
import { log } from "../../../../utils/logger";
import { Schema } from "mongoose";

export const getUserById = async ({ traceId, _id }: {
    traceId: string,
    _id: Schema.Types.ObjectId
}) => {
    log.info(`[${traceId}] [getUserById] [START]`);
    try {

        const user = await db.user.findOne({ _id }).lean();

        log.info(`[${traceId}] [getUserById] [END]`);
        return {
            data: user
        };
    } catch (error) {
        const errorMessage = (error as Error).message || "No error description";
        log.error(`[${traceId}] [getUserById] [ERROR] ${errorMessage}`);
        return { error };
    }
}