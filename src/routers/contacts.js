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
import { upload } from "../middlewares/multer.js";

const router = Router();


router.use(authenticate);

router.get('/', ctrlWrapper(getContactsController));

router.get('/:contactsId',
    isValidId,
    ctrlWrapper(getContactsByIdController)
);

router.post('/',
    validateBody(createStudentSchema),
    upload.single('photo'),
    ctrlWrapper(createStudentController)
);

router.patch('/:contactsId',
    validateBody(studentSchemaPatch),
    isValidId,
        upload.single('photo'),
    ctrlWrapper(pathContactsController)
);

router.delete('/:contactsId',
    isValidId,
    ctrlWrapper(deleteContactController)
);

export default router;
