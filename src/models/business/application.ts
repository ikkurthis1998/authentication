import { Schema, model } from 'mongoose';
import { User } from '../user/user';
import { Business } from './business';

export enum applicationType {
    mobile = 'MOBILE',
    web = 'WEB'
}

export enum applicationStatus {
    active = 'ACTIVE',
    inactive = 'INACTIVE',
    deleted = 'DELETED'
}

export type Application = {
    _id: Schema.Types.ObjectId;
    name: string;
    type: string;
    appData: string;
    token: string;
    users: User[];
    business: Business;
    // activities: Schema.Types.ObjectId[];
    invites: Schema.Types.ObjectId[];
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

const ApplicationSchema = new Schema(
	{
		name: {
			type: String,
			required: true
		},
		type: {
			type: String,
			required: true,
			enum: [applicationType.mobile, applicationType.web]
		},
		appData: {
			type: String,
			required: true
		},
		token: {
			type: String,
			required: true,
			unique: true
		},
		users: [
			{
				type: Schema.Types.ObjectId,
				ref: "User",
				bind: true,
				populate: {
					path: "users",
					select: {
						_id: 1,
						name: 1,
						email: 1,
						phone: 1,
						emailVerified: 1,
						phoneVerified: 1,
						profileImage: 1,
						status: 1
					}
				}
			}
		],
		business: {
			type: Schema.Types.ObjectId,
			ref: "Business",
			bind: true,
			required: true,
			populate: {
				path: "business",
				select: {
					name: 1,
					isVerified: 1,
					logo: 1,
					status: 1
				}
			}
		},
		// activities: [{
		//     type: Schema.Types.ObjectId,
		//     ref: 'Activity'
		// }],
		invites: [
			{
				type: Schema.Types.ObjectId,
				ref: "Invite",
				bind: true,
				populate: {
					path: "invites",
					select: {
						_id: 1,
						email: 1,
						code: 1,
						status: 1,
						application: 1,
						business: 1,
						role: 1
					}
				}
			}
		],
		status: {
			type: String,
			required: true,
			enum: [
				applicationStatus.active,
				applicationStatus.inactive,
				applicationStatus.deleted
			]
		}
	},
	{
		timestamps: true
	}
);

export const application = model<Application>('Application', ApplicationSchema);