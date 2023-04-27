import express from "express";
import UserData from "../models/dataModel.js";

const router = express.Router();

router.post("/create/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await UserData.findOne({ userId: userId });
        if (user !== null) {
            return res.status(200).json(user);
        }

        const newUser = await UserData.create({ userId: userId });
        return res.status(201).json(newUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: error });
    }
});

router.get("/get/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        const data = await UserData.findOne({ userId: userId });

        res.status(200).json({ success: true, movies: data?.moviesList || [] });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
});

router.post("/set/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const { mediaType, mediaId } = req.body;

        if (!mediaType || !mediaId) {
            return res.status(403).send("Movies details are missing.");
        }

        const data = await UserData.findOne({ userId: userId });
        if (data !== null && data.moviesList && data.moviesList.length > 0) {
            let found = false;
            data?.moviesList?.forEach((item) => {
                if(item.mediaId === mediaId && item.mediaType === mediaType) {
                    found = true;
                }
            })

            if(found) {
                const updatedData = data.moviesList.filter((item) => item.mediaId !== mediaId)
                data.moviesList = updatedData;
                await data.save();
                return res.status(201).json(data);
            }

            data.moviesList = data.moviesList.concat({ mediaId, mediaType });
            await data.save();
            return res.status(201).json(data);
        }

        const newData = await UserData.create({ userId });

        newData.moviesList = newData.moviesList.concat({ mediaId, mediaType });
        await newData.save();

        res.status(201).json(newData);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

export default router;
