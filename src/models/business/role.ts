import { Schema, model } from 'mongoose';
import { User } from '../user/user';
import { Application } from './application';
import { Business } from './business';

export type Role = {
    _id: Schema.Types.ObjectId;
    name: string;
    description: string;
    users: User[];
    applications: Application[];
    business: Business;
    createdAt: Date;
    updatedAt: Date;
}

const RoleSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        bind: true
    }],
    applications: [{
        type: Schema.Types.ObjectId,
        ref: 'Application',
        bind: true
    }],
    business: {
        type: Schema.Types.ObjectId,
        ref: 'Business',
        bind: true
    }
}, {
    timestamps: true
});

export const role = model('Role', RoleSchema);