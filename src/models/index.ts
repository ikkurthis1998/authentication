import * as business from './business';
import * as user from './user';

export const db = {
    ...business,
    ...user
};