import { ContactsCollection } from "../db/models/contacts.js";

export const getAllContacts = async () => {
    const contacts = await ContactsCollection.find();
    return contacts;
};
export const getContactsById = async (contactId) => {
    const contacts = await ContactsCollection.findById(contactId);
    return contacts;
};
export const createContacts = async (payload) => {
    const student = await ContactsCollection.create(payload);
    return student;
};
export const updateContacts = async (contactsId, payload, options = {}) => {
    const rawResult = await ContactsCollection.findByIdAndUpdate(
        { _id: contactsId },
        payload,
        {
            new: true,
            includeResultMetadata: true,
            ...options
      }
    );
    if (!rawResult || !rawResult.value) return null;
    return {
        student: rawResult.value,
        isNew: Boolean(rawResult)?.lastErrorObject?.upserted
    };
};
export const deleteContacts = async (contactId) => {
    const contacts = await ContactsCollection.findOneAndDelete({
        _id: contactId,
    });
    return contacts;
};
