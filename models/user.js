import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: String,
    userName: String,
    password: String,
})