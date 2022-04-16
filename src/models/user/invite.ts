import { Schema, model } from 'mongoose';
import { Application } from '../business/application';
import { Business } from '../business/business';

export enum InviteType {
    business = 'BUSINESS',
    application = 'APPLICATION'
}

export enum InviteStatus {
    pending = 'PENDING',
    accepted = 'ACCEPTED',
    rejected = 'REJECTED',
    expired = 'EXPIRED'
}

export type Invite = {
    _id: Schema.Types.ObjectId;
    email: string;
    code: string;
    type: string;
    role?: string;
    business?: Business;
    application?: Application;
    expiry: Date;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

const InviteSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
			lowercase: true,
			trim: true,
			match: [
				/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
				"Please enter a valid email"
			]
		},
		code: {
			type: String,
			required: true,
			unique: true
		},
		type: {
			type: String,
			required: true,
			enum: [InviteType.business, InviteType.application]
		},
		role: {
			type: String,
			required: false
		},
		business: {
			type: Schema.Types.ObjectId,
			ref: "Business",
			bind: true,
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
		application: {
			type: Schema.Types.ObjectId,
			ref: "Application",
			bind: true,
			populate: {
				path: "application",
				select: {
					name: 1,
					type: 1,
					token: 1,
					status: 1
				}
			}
		},
		expiry: {
			type: Date,
			required: true
		},
		status: {
			type: String,
			required: true,
			enum: [
				InviteStatus.pending,
				InviteStatus.accepted,
				InviteStatus.rejected,
				InviteStatus.expired
			]
		}
	},
	{
		timestamps: true
	}
);

export const invite = model<Invite>('Invite', InviteSchema);