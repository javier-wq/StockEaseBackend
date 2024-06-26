import { Schema, Types, model, Model } from "mongoose";
import { Image } from "../interfaces/image.interface";


const ImageSchema = new Schema<Image> (
    {
        public_id: {
            type: String,
            required: true
        },
        secure_url: {
            type: String,
            required: true
        }
    }
);

const ImagesModel = model("Images", ImageSchema);
export default ImagesModel;