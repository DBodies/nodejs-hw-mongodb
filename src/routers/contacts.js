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

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController));
router.get('/contacts/:contactsId',
    isValidId,
    ctrlWrapper(getContactsByIdController));
router.post('/contacts', ctrlWrapper(createStudentController));
router.patch('/contacts/:contactsId',
    isValidId,
    ctrlWrapper(pathContactsController));
router.delete('/contacts/:contactId',
    isValidId,
    ctrlWrapper(deleteContactController));

export default router;
