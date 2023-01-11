import mongoose from "mongoose";
import cors from "cors";
import express from "express";
import options from "./config.json" assert { type: "json" };

import UserRouter from "./src/routes/User.router.js";

const app = express();

app.use(cors({
    origin: options.frontendUri
}));
app.use(express.json());

app.use("/user", UserRouter);

mongoose.connect(options.connectionString, {
    useNewUrlParser: true
}, () => {
    console.log(`Connection to MongoDB has been opened successfully`);
});
app.listen(options.port, () => {
    console.log(`Server listening on http://localhost:${options.port}/`);
});