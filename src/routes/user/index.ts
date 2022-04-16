import express from 'express';
import { controller } from '../../controller';

export const userRouter = express.Router();

userRouter.post("/signup", controller.signupController);
userRouter.post("/signin", controller.signinController);
userRouter.get("/refreshAccessToken", controller.refreshAccessToken);
