import { Router } from "express";
import {validateBody }from '../middlewares/validateBody.js';
import { loginUserSchema, registerUserSchema, requestResetEmailSchema, resetPasswordSchema } from "../validation/auth.js";
import {ctrlWrapper} from '../utils/ctrlWrapper.js';
import { loginUserController, logoutUserController, refreshUserSessionController, registerUserController, requestUserEmailController, resetPasswordController } from "../controllers/auth.js";

const router = Router();
console.log('auth router loaded');

router.post(
    '/register',
    validateBody(registerUserSchema),
    ctrlWrapper(registerUserController)
);

router.post(
    '/login',
    validateBody(loginUserSchema),
    ctrlWrapper(loginUserController)
);

router.post(
    '/refresh',
    ctrlWrapper(refreshUserSessionController)
);

router.post(
    '/logout',
    ctrlWrapper(logoutUserController)
);

router.post(
    '/send-reset-email',
    validateBody(requestResetEmailSchema),
    ctrlWrapper(requestUserEmailController)
);

router.post(
    '/reset-pwd',
    validateBody(resetPasswordSchema),
    ctrlWrapper(resetPasswordController)
);
export default router;
