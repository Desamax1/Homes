import mongoose from "mongoose";
import cors from "cors";
import express from "express";

const app = express();

app.use(cors({
    origin: "http://localhost:3000"
}));


mongoose.connect(process.env.CONN_STRING, () => {
    console.log(`Connection to MongoDB at ${process.env.CONN_STRING} has been opened successfully`);
});
app.listen(process.env.PORT, () => {
    console.log(`Server listening on http://localhost:${process.env.PORT}/`);
});