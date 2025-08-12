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
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        photo: {
            type: String
        },
    },
    {
        timestamps: true
    }
);

export const ContactsCollection = model('contacts', contactsSchema, 'studentsHW');
