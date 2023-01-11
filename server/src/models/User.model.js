import { model, Schema } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    lastSeen: {
        type: Date,
        default: Date.now()
    },
    listings: [
        {
            type: Schema.Types.ObjectId,
            ref: "Listing"
        }
    ],
    email: {
        type: String,
        unique: true,
        required: true
    },
    phoneNumber: {
        type: String,
        unique: true,
        required: true
    },
});

const Users = model("User", userSchema);

export default Users;