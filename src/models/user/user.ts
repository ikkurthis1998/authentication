import { Schema, model } from 'mongoose';
import { Application } from '../business/application';
import { Business } from '../business/business';
import { Role } from '../business/role';

export enum userStatus {
    active = 'ACTIVE',
    inactive = 'INACTIVE',
    deleted = 'DELETED'
}

export enum userRole {
    admin = 'ADMIN',
    developer = 'DEVELOPER',
    limited = 'LIMITED'
}

export type User = {
    _id: Schema.Types.ObjectId;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    emailVerified: boolean;
    phone: string;
    phoneVerified: boolean;
    userData: string;
    profileImage: string;
    role: string;
    business: Business;
    apps: Application[];
    // appRoles: Role[];
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
			unique: true
		},
		firstName: {
			type: String,
			required: true,
			trim: true
		},
		lastName: {
			type: String,
			required: true,
			trim: true
		},
		email: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
			unique: true,
			match: [
				/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
				"Please enter a valid email"
			]
		},
		emailVerified: {
			type: Boolean,
			default: false
		},
		phone: {
			type: String,
			// required: true,
			trim: true,
			unique: true,
			match: [
				/^\+[0-9]{1,3}\.[0-9]{4,14}(?:x.+)?$/,
				"Please enter a valid phone number"
            ], // EPP format for phone number, +CCC.NNNNNNNNNNxEEEE
            set: (phone: string) => {
                return phone.replace('.', '').replace('x', '');
            }
		},
		phoneVerified: {
			type: Boolean,
			default: false
		},
		userData: {
			type: String,
			required: true
		},
		profileImage: {
			type: String,
			default: ""
		},
		role: {
            type: String,
            enum: [
                userRole.admin,
                userRole.developer,
                userRole.limited
            ]
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
		applications: [
			{
				type: Schema.Types.ObjectId,
                ref: "Application",
                bind: true
			}
		],
		status: {
			type: String,
			required: true,
			default: userStatus.active,
			enum: [userStatus.active, userStatus.inactive, userStatus.deleted]
		}
	},
	{
		timestamps: true
	}
);

export const user = model<User>('User', UserSchema);