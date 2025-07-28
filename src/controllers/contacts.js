import { createContacts, getAllContacts, getContactsById, updateContacts,deleteContacts } from "../services/contacts.js";
import createHttpError from "http-errors";

export const getContactsController = async (req, res, next) => {
    const contacts = await getAllContacts();
    res.json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts
    });
};

export const getContactsByIdController = async (req, res) => {
    const { contactsId } = req.params;
    const contacts = await getContactsById(contactsId);

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
    const student = await createContacts(req.body);
    res.status(201).json({
		status: 201,
		message: "Successfully created a contact!",
		data: student
    });
};
export const pathContactsController = async (req, res, next) => {
    const { contactsId } = req.params;
    const result = await updateContacts(contactsId, req.body);

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
    const contact = await deleteContacts(contactId);

    if (!contact) {
        return next(createHttpError(404, "Contact not found"));
    }
    res.status(204).send();
};
