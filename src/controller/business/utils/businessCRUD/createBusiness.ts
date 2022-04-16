import { db } from "../../../../models"
import { log } from "../../../../utils/logger";

export const createBusiness = async ({ traceId, name, code, logo }: { traceId: string, name: string, code: string, logo: string }) => {
    log.info(`[${traceId}] [createBusiness] [START]`)
    try {

        const business = await new db.business({
            name,
            code,
            logo
        }).save();

        log.info(`[${traceId}] [createBusiness] [END]`)
        return {
            data: business
        }

    } catch (error) {
        const errorMessage =
			(error as Error).message || "No error description";
        log.error(`[${traceId}] [createBusiness] [ERROR] ${errorMessage}`);
        return { error }
    }
}