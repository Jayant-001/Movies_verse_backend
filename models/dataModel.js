import mongoose from "mongoose";

const dataSchema = mongoose.Schema({
    userId: {
        type: String,
        require: true,
        unique: true,
    },
    moviesList: {
        type: Array,
        default: [],
    },
});

const UserData = mongoose.model("userData", dataSchema);
export default UserData;
