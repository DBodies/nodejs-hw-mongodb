import { model, Schema } from 'mongoose';

const contactsSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        },
        email: {
            type: String,
            default: false
        },
        isFavourite: {
        type: Boolean
        },
        contactType: {
            type: String,
            enum: ['work', 'home', 'personal'],
            required: true,
        default: false
        },
    },
    {
        timestamps: true
    }
);

export const ContactsCollection = model('contacts', contactsSchema, 'studentsHW');
