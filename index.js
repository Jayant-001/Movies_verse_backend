import express from "express";
import mongoose from "mongoose";
import cors from 'cors'
import * as dotenv from "dotenv";
dotenv.config();

import router from './routes/dataRoute.js'

const app = express();
app.use(express.json());
app.use(cors())

app.use('/api', router)

const MONGO_URL = process.env.MONGO_URI;
const PORT = process.env.PORT || 4001;

mongoose
    .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log("DB connected && App is listening on port " + PORT);
        });
    })
    .catch((err) => {
        console.log("Server connection error ", err.message);
    });
