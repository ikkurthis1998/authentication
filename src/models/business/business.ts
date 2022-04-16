import { Schema, model } from 'mongoose';
import { User } from '../user/user';
import { Application } from './application';

export enum businessStatus {
    active = 'ACTIVE',
    inactive = 'INACTIVE',
    deleted = 'DELETED'
}

export type Business = {
    _id: Schema.Types.ObjectId;
    name: string;
    code: string;
    isVerified: boolean;
    logo: string;
    users: User[];
    applications: Application[];
    invites: Schema.Types.ObjectId[];
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

const BusinessSchema = new Schema(
	{
		name: {
			type: String,
			required: true
		},
		code: {
			type: String,
			required: true,
			unique: true
		},
		isVerified: {
			type: Boolean,
			default: false
		},
		logo: {
			type: String,
			default: ""
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
						username: 1,
						firstName: 1,
						lastName: 1,
						email: 1,
						phone: 1,
						emailVerified: 1,
						phoneVerified: 1,
						profileImage: 1,
						status: 1,
						role: 1,
						apps: 1,
						business: 1
					}
				}
			}
		],
		applications: [
			{
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
			}
		],
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
			default: businessStatus.active,
			enum: [
				businessStatus.active,
				businessStatus.inactive,
				businessStatus.deleted
			]
		}
	},
	{
		timestamps: true
	}
);

export const business = model<Business>('Business', BusinessSchema);