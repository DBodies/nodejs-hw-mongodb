import { isValidObjectId } from "mongoose";
import createHttpError from "http-errors";


export const isValidId = (req, res, next) => {
    const { contactsId } = req.params;
    if (!isValidObjectId(contactsId)) {
        createHttpError(400, 'Bad request');
    }
    next();
};
