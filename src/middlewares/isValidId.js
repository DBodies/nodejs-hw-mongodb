import { isValidObjectId } from "mongoose";
import createHttpError from "http-errors";


export const isValidId = (req, res, next) => {
    const { contactsId } = req.params;
    if (!isValidObjectId(contactsId)) {
       return next(createHttpError(500, 'Bad request'));
    }
    next();
};
