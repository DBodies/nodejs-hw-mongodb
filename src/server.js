import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import dotenv from 'dotenv';
import { getEnvVar } from './utils/getEnvVar.js';
import { getAllContacts, getContactsById } from './services/contacts.js';

dotenv.config();

const PORT = Number(getEnvVar('PORT', '4561'));

export const setupServer = () => {
    const app = express();

    app.use(express.json());
    app.use(cors());
    app.use(
        pino({
            transport: {
                target: 'pino-pretty',
            },
        }),
    );

    app.get('/contacts', async (req, res) => {
        const contacts = await getAllContacts();
        res.status(200).json({
            message: "Successfully found contacts!",
            data: contacts
        });
    });

    app.get('/contacts/:contactId', async (req, res, next) => {
        const { contactId } = req.params;
        const contact = await getContactsById(contactId);
        if (!contact) {
            res.status(404).json({
                message: 'Contact not found',
            });
            return;
        } else {
            res.status(200).json({
                status: 200,
                message: "Successfully found contact with id {contactId}!",
                data:  contact
            });
        }
    });

    app.use((req, res) => {
        res.status(400).json({
            message: 'Not Found'
        });
    });

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};
