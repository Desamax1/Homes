import Listings from "../models/Listing.model.js";
import Users from "../models/User.model.js";

const getAllListings = async (req, res) => {
    try {
        const listings = Listings.find();
        return res.status(200).json(listings);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An unexpected error has occured!"
        });
    }
}
export const GetAllListings = getAllListings;

const addListing = async (req, res) => {
    try {
        const { price, isAuction, title, description, address, isPremium, category, area } = req.body;

        if (!price || !title || !address || !category || !area) {
            return res.status(400).json({
                message: "You have to provide all of the necessary fields (price, title, address, category, area)!"
            });
        }

        const user = await Users.findById(res.locals.user.id);

        const listing = await Listings.create({
            price,
            title,
            address,
            category,
            area,
            isAuction,
            isPremium,
            description,
            author: user
        });

        if (listing) {
            user.listings.push(listing);

            await user.save();
            return res.status(201).json({
                message: "Listing created successfully",
                id: listing.id
            });
        } else {
            throw "Something went wrong!";
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An unexpected error has occured!"
        });
    }
}
export const AddListing = addListing;