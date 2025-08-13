import { Router } from "express";
import {validateBody }from '../middlewares/validateBody.js';
import { loginUserSchema, loginWithGoogleOAuthSchema, registerUserSchema, requestResetEmailSchema, resetPasswordSchema } from "../validation/auth.js";
import {ctrlWrapper} from '../utils/ctrlWrapper.js';
import { getGoogleOAuthController, loginUserController, loginWithGoogleController, logoutUserController, refreshUserSessionController, registerUserController, requestUserEmailController, resetPasswordController } from "../controllers/auth.js";

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

router.get('/get-oauth-url',
    ctrlWrapper(getGoogleOAuthController)
);

router.post(
    '/confirm-oauth',
    validateBody(loginWithGoogleOAuthSchema),
    ctrlWrapper(loginWithGoogleController)
);
export default router;
