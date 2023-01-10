import * as dotenv from "dotenv";
dotenv.config();

import express from "express";

const app = express();

app.listen(process.env.PORT, () => {
    console.log(`Server listening on http://localhost:${process.env.PORT}/`);
});