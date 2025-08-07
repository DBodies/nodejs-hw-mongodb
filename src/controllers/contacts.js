import { createContacts, getAllContacts, getContactsById, updateContacts,deleteContacts } from "../services/contacts.js";
import createHttpError from "http-errors";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { parseFilterParams } from "../utils/parsFilterParams.js";

export const getContactsController = async (req, res, next) => {
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);
    const filter = parseFilterParams(req.query);
    const contacts = await getAllContacts({
        page,
        perPage,
        sortBy,
        sortOrder,
        filter,
         userId: req.user._id
    });
    res.json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts
    });
};

export const getContactsByIdController = async (req, res) => {
    const { contactsId } = req.params;
    const contacts = await getContactsById(contactsId, req.user._id);

    if (!contacts) {
        throw createHttpError(404, 'Contact not found!');
    }
    res.json({
        status: 200,
        message: `Successfully found student with id ${contactsId}`,
        data: contacts
    });
};
export const createStudentController = async (req, res) => {
    const payload = { ...req.body, userId: req.user._id };
    const student = await createContacts(payload);
    res.status(201).json({
		status: 201,
		message: "Successfully created a contact!",
		data: student
    });
};
export const pathContactsController = async (req, res, next) => {
    const { contactsId } = req.params;
    const result = await updateContacts(contactsId, req.body, req.user._id);

    if (!result) {
        next(createHttpError(404, 'Student not found'));
    }
    res.json({
	status: 200,
	message: "Successfully patched a contact!",
	data: result
    });
};
export const deleteContactController = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await deleteContacts(contactId, req.user._id);

    if (!contact) {
        return next(createHttpError(404, "Contact not found"));
    }
    res.status(204).send();
};
