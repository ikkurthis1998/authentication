import { db } from "../../../../models"
import { log } from "../../../../utils/logger";
import { Schema, isValidObjectId } from "mongoose";
import { httpStatusCode } from "../../../../utils/httpStatusCode";
import { Application } from "../../../../models/business/application";
import { Business } from "../../../../models/business/business";
import { User } from "../../../../models/user/user";
import { Invite } from "../../../../models/user/invite";

export interface UpdateBusinessInput extends Business {
    traceId: string;
}

export const updateBusiness = async ({
	traceId,
	name,
	code,
	logo,
	_id,
	isVerified,
	applications,
	users,
    invites,
    status
}: UpdateBusinessInput) => {
    
	log.info(`[${traceId}] [updateBusiness] [START]`);
	try {
		if (!isValidObjectId(_id)) {
			log.error(`[${traceId}] [updateBusiness] [ERROR] Invalid ObjectId`);
			return {
				error: {
					status: httpStatusCode.BAD_REQUEST,
					message: "Invalid ObjectId"
				}
			};
		}

		await db.business.updateOne(
			{ _id },
			{
				name,
				code,
				logo,
                isVerified,
                applications,
                users,
                invites,
                status
			}
        );
        
        const business = await db.business.findOne({ _id });

		log.info(`[${traceId}] [updateBusiness] [END]`);
		return {
			data: business
		};
	} catch (error) {
		const errorMessage = (error as Error).message || "No error description";
		log.error(`[${traceId}] [updateBusiness] [ERROR] ${errorMessage}`);
		return { error };
	}
};