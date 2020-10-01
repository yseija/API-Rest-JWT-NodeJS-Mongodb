import { Mongoose } from "mongoose";
import {Schema, model} from "mongoose";

const moviesSchema = new Schema({
    name: String,
    director: String,
    year:Number,
    genere: String,
    imgURL: String
}, {
    timestamps: true,
    versionKey: false
}
)


export default model(' Movies', moviesSchema);