import { model, Schema } from "mongoose";

const listingSchema = new Schema({
    price: Number,
    isAuction: Boolean,
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    title: String,
    description: String,
    address: String,
    isPremium: Boolean,
    category: String,
    area: Number,
    createdAt: Number,
    hasExpired: Boolean
});

const Listings = model("Listing", listingSchema);

export default Listings;