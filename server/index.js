import mongoose from "mongoose";
import cors from "cors";
import express from "express";
import options from "./config.json" assert { type: "json" };
import cookieParser from "cookie-parser";

import UserRouter from "./src/routes/User.router.js";
import ListingRouter from "./src/routes/Listing.router.js";

const app = express();

app.use(cors({
    origin: options.frontendUri
}));
app.use(express.json());
app.use(cookieParser());

app.use("/user", UserRouter);
app.use("/listing", ListingRouter);

(async function(){
    console.log("\n\nBacked is starting...\n");

    await mongoose.connect(options.connectionString, {
        useNewUrlParser: true
    });
    console.log(`Connection to MongoDB has been opened successfully`);

    await app.listen(options.port);
    console.log(`Server listening on http://localhost:${options.port}/`);

    console.log("\nBackend is up and running!");
})()

console.log("tralalla");
