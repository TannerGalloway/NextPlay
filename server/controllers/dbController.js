import { library } from "../models/dbModel.js";

// Add to library
const save = async (req, res) => {
    const { gameID, sessionID } = req.body;
    const error = await library.addToLibrary(gameID, sessionID);
    if ( error ) {
        res.status(500).json(error);
    }
    res.status(200).json("Added Successfully");
};

export { save };