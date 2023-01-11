import { Router } from "express";
import { AddListing, GetAllListings } from "../controllers/Listing.controller.js";
import { AuthUser } from "../middleware/AuthHelper.js";

const ListingRouter = Router();

ListingRouter.get("/", GetAllListings);

ListingRouter.post("/create", AuthUser, AddListing);

export default ListingRouter;