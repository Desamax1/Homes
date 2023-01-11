import { model, Schema } from "mongoose";

const listingSchema = new Schema({
    price: {
        type: Number,
        required: true
    },
    isAuction: {
        type: Boolean,
        default: false
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: true
    },
    description: String,
    address: {
        type: String,
        required: true
    },
    isPremium: {
        type: Boolean,
        default: false
    },
    category: {
        type: String,
        required: true
    },
    area: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    hasExpired: {
        type: Boolean,
        default: false
    }
});

const Listings = model("Listing", listingSchema);

export default Listings;