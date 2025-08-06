import { Router } from "express";
import {
    createStudentController,
    deleteContactController,
    getContactsByIdController,
    getContactsController,
    pathContactsController
} from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { isValidId } from "../middlewares/isValidId.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createStudentSchema, studentSchemaPatch } from "../validation/contacts.js";
import { authenticate } from "../middlewares/authenticate.js";
import { checkRoles } from "../middlewares/checkRoles.js";
import { ROLES } from "../constants/index.js";

const router = Router();

router.get('/contacts',
    checkRoles(ROLES.LEAD, ROLES.USER),
    ctrlWrapper(getContactsController));


router.get('/contacts/:contactsId',
        checkRoles(ROLES.LEAD, ROLES.USER),
    isValidId,
    ctrlWrapper(getContactsByIdController));


router.post('/contacts',
        checkRoles(ROLES.LEAD),
        validateBody(createStudentSchema),
    ctrlWrapper(createStudentController));

router.patch('/contacts/:contactsId',
        checkRoles(ROLES.LEAD, ROLES.USER),
        validateBody(studentSchemaPatch),
    isValidId,
    ctrlWrapper(pathContactsController));


router.delete('/contacts/:contactId',
        checkRoles(ROLES.LEAD),
    isValidId,
    ctrlWrapper(deleteContactController));


router.use(authenticate);
export default router;
