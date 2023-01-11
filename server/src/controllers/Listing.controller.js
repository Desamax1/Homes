import Listings from "../models/Listing.model.js";
import Users from "../models/User.model.js";

const getAllListings = async (req, res) => {
    try {
        const listings = await Listings.find({ hasExpired: false }, "-__v").populate("author", "-hash -salt -createdAt -listings -__v");
        return res.status(200).json(listings);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An unexpected error has occured!"
        });
    }
}
export const GetAllListings = getAllListings;

const getListing = async (req, res) => {
    try {
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({
                message: "Invalid listing id!"
            });
        }

        const listings = await Listings.findById(req.params.id, "-__v").populate("author", "-hash -salt -createdAt -listings -__v");

        if (listings) {
            return res.status(200).json(listings);
        } else {
            return res.status(404).json({
                message: "Listing not found"
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An unexpected error has occured!"
        });
    }
}
export const GetListing = getListing;

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

const removeListing = async (req, res) => {
    try {
        const user = await Users.findById(res.locals.user.id).populate("listings");

        const listing = await Listings.findByIdAndRemove(req.params.id, {
            author: user
        });

        if (listing) {
            user.listings.splice(user.listings.indexOf(listing), 1);
            await user.save();

            return res.status(200).json({
                message: "Listing removed successfully"
            });
        } else {
            return res.status(404).json({
                message: "That listing doesn't exist"
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An unexpected error has occured!"
        });
    }
}
export const RemoveListing = removeListing;

const updateListing = async (req, res) => {
    try {
        const newData = {};
        const { price, isAuction, title, description, isPremium } = req.body;

        if (typeof price !== "undefined") {
            newData.price = price;
        }
        if (typeof isAuction !== "undefined") {
            newData.isAuction = isAuction;
        }
        if (typeof title !== "undefined") {
            newData.title = title;
        }
        if (typeof description !== "undefined") {
            newData.description = description;
        }
        if (typeof isPremium !== "undefined") {
            newData.isPremium = isPremium;
        }

        if (Object.keys(newData).length <= 0) {
            return res.status(400).json({
                message: "You have to specify at least one parameter that you wish to update!"
            });
        }

        newData.lastChanged = Date.now();
        await Listings.findByIdAndUpdate(req.params.id, newData);

        return res.status(200).json({
            message: "Listing updated successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An unexpected error has occured!"
        });
    }
}
export const UpdateListing = updateListing;