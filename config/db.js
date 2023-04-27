import mongoose from "mongoose";

const URI = process.env.MONGO_URI;

export default mongoose
    .connect(URI)
    .then(() => {
        console.log("DB connected successfully");
    })
    .catch((err) => console.log(err));
