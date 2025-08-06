import { Schema, model } from "mongoose";
import { ROLES } from "../../constants/index.js";

const userSchema = new Schema(
    {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        match: [/.+@.+\..+/, 'Please enter a valid email address'],
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
        },
        role: {
      type: String,
      enum: [ROLES.LEAD, ROLES.USER],
      default: ROLES.USER,
    },
},
    {
        timestamps: true
    }
);

export const UsersCollection = model('users', userSchema);


