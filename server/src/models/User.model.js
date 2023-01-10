import { model, Schema } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    hash: String,
    salt: String,
    createdAt: Number,
    lastSeen: Number,
    listings: [
        {
            type: Schema.Types.ObjectId,
            ref: "Listing"
        }
    ],
    email: {
        type: String,
        unique: true
    },
    phoneNumber: {
        type: String,
        unique: true
    },
});

const Users = model("User", userSchema);

export default Users;