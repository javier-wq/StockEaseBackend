import { Schema, Types, model, Model } from "mongoose";
import { datainf } from "../interfaces/datainf.interface"


const DataInfSchema = new Schema<datainf> (
    {
        userData: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        uploadDate: {
            type: Date,
            default: Date.now
        },
        images:[{
            type: Schema.Types.ObjectId,
            ref: 'Images'
        }]
    }
);

const DataInfModel = model("DataInf", DataInfSchema);
export default DataInfModel;