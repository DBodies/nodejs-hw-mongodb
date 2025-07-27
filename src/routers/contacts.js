import { Router } from "express";
import {
    createStudentController,
    deleteContactController,
    getContactsByIdController,
    getContactsController,
    pathContactsController
} from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController));
router.get('/contacts/:contactsId', ctrlWrapper(getContactsByIdController));
router.post('/contacts', ctrlWrapper(createStudentController));
router.patch('/contacts/contactsId', ctrlWrapper(pathContactsController));
router.delete('/contacts/contactsId', ctrlWrapper(deleteContactController));

export default router;
