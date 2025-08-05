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

const router = Router();

router.get('/contacts',
    ctrlWrapper(getContactsController));
router.get('/contacts/:contactsId',
    isValidId,
    ctrlWrapper(getContactsByIdController));


router.post('/contacts',
        validateBody(createStudentSchema),
    ctrlWrapper(createStudentController));

router.patch('/contacts/:contactsId',
        validateBody(studentSchemaPatch),
    isValidId,
    ctrlWrapper(pathContactsController));


router.delete('/contacts/:contactId',
    isValidId,
    ctrlWrapper(deleteContactController));

export default router;
