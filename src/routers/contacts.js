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

const router = Router();


router.use(authenticate);

router.get('/', ctrlWrapper(getContactsController));

router.get('/:contactsId',
    isValidId,
    ctrlWrapper(getContactsByIdController)
);

router.post('/',
    validateBody(createStudentSchema),
    ctrlWrapper(createStudentController)
);

router.patch('/:contactsId',
    validateBody(studentSchemaPatch),
    isValidId,
    ctrlWrapper(pathContactsController)
);

router.delete('/:contactId',
    isValidId,
    ctrlWrapper(deleteContactController)
);

export default router;
