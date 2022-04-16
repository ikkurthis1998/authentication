import { Schema } from "mongoose";
import { db } from "../../../../models";
import { log } from "../../../../utils/logger";

export const getBusiness = async ({ traceId, _id }: { traceId: string, _id: Schema.Types.ObjectId }) => {
    log.info(`[${traceId}] [getBusiness] [START]`);
    try {

        const business = await db.business.findOne({ _id }).lean();

        log.info(`[${traceId}] [getBusiness] [END]`);
        return {
            data: business
        };

    } catch (error) {
        const errorMessage = (error as Error).message || "No error description";
        log.error(`[${traceId}] [getBusiness] [ERROR] ${errorMessage}`);
        return { error }
    }
}
