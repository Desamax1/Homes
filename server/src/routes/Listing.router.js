import { Router } from "express";
import { AddListing, GetAllListings, GetListing, RemoveListing, UpdateListing } from "../controllers/Listing.controller.js";
import { AuthUser } from "../middleware/AuthHelper.js";

const ListingRouter = Router();

ListingRouter.get("/", GetAllListings);
ListingRouter.get("/:id", GetListing);

ListingRouter.post("/create", AuthUser, AddListing);

ListingRouter.put("/update/:id", AuthUser, UpdateListing);

ListingRouter.delete("/remove/:id", AuthUser, RemoveListing);

export default ListingRouter;