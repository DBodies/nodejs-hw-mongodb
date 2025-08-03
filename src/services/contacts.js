import { ContactsCollection } from "../db/models/contacts.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";
import { SORT_ORDER } from '../constants/index.js';

export const getAllContacts = async({
    page = 1,
    perPage = 10,
    sortOrder = SORT_ORDER.ASC,
    sortBy = '_id',
    filter = {}
}) => {
    const limit = perPage;
    const skip = (page - 1) * perPage;

    const contactsQuery = ContactsCollection.find();

    if (filter.type) {
        contactsQuery.where("type").equals(filter.type);
    }
    if (filter.isFavourite) {
        contactsQuery.where("isFavourite").equals(filter.isFavourite);
    }
    const [contactsCount,contacts] = await Promise.all([
        contactsQuery.clone().countDocuments(),
        contactsQuery
            .skip(skip)
            .limit(limit)
            .sort({[sortBy]: sortOrder})
            .exec()
    ]);
    const paginationData = calculatePaginationData(contactsCount, page, perPage);
    return {
        data: contacts,
        ...paginationData
    };
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
    return rawResult.value
        ;
};
export const deleteContacts = async (contactId) => {
    const contacts = await ContactsCollection.findOneAndDelete({
        _id: contactId,
    });
    return contacts;
};
