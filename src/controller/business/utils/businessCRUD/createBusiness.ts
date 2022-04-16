import { db } from "../../../../models"

export const createBusiness = async ({ traceId }: { traceId: string }) => {
    try {

        const business = new db.business({
            name: "Business Name",
            code: "business-code",
            logo: ""
        });

    } catch (error) {
        return { error }
    }
}