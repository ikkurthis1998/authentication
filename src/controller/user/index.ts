import { signinController } from "./signinController";
import { signupController } from "./signupController";
import { refreshAccessToken } from "./refreshAccessToken";

export const userController = {
    signinController,
    signupController,
    refreshAccessToken
};