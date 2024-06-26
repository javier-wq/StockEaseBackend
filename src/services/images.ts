import { Image } from "../interfaces/image.interface";
import ImageModel from "../models/images";

const insertImage = async (data: Image) => {
  const responseInsert = await ImageModel.create(data);
  return responseInsert;
};

const readImagesInf = async () => {
  const responseSites = await ImageModel.find({}).lean();
  return responseSites;
};

const readImage = async (id: string) => {
  const responseSite = await ImageModel.findOne({ _id: id }).lean();
  return responseSite;
};

const putImage = async (id: string, data: Image) => {
  const responseSite = await ImageModel.findByIdAndUpdate(
    { _id: id },
    data,
    {
      new: true,
    }
  ).lean();
  return responseSite;
};

const dropImage = async (id: string) => {
  const responseSite = await ImageModel.deleteOne({ _id: id });
  return responseSite;
};

export {
  insertImage,
  readImagesInf,
  readImage,
  putImage,
  dropImage,
};
