import { Request, Response } from "express";
import { handlerHttp } from "../utils/error.handler";
import {
  insertImage,
  readImagesInf,
  readImage,
  putImage,
  dropImage,
} from "../services/images";
import { Image } from "../interfaces/image.interface";

const getImage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await readImage(id);

    if (!response) {
      return res.status(404).send("NOT_FOUND");
    }

    res.send(response);
  } catch (e) {
    console.error(e);
    handlerHttp(res, "ERROR_GET_IMAGE");
  }
};

const getAllImages = async (req: Request, res: Response) => {
  try {
    const response = await readImagesInf();
    res.send(response);
  } catch (e) {
    handlerHttp(res, "ERROR_GET_ALL_IMAGES");
  }
};

const updateImage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body as Image;
    const response = await putImage(id, data);
    res.send(response);
  } catch (e) {
    console.error(e);
    handlerHttp(res, "ERROR_UPDATE_IMAGE");
  }
};

const createImage = async (req: Request, res: Response) => {
  try {
    const data = req.body as Image;
    const response = await insertImage(data);
    res.send(response);
  } catch (error) {
    console.error(error);
    res.status(500).send("INTERNAL_SERVER_ERROR");
  }
};

const deleteImageById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await dropImage(id);
    res.send(response);
  } catch (e) {
    console.error(e);
    handlerHttp(res, "ERROR_DELETE_IMAGE");
  }
};

export {
  getImage,
  getAllImages,
  updateImage,
  createImage,
  deleteImageById,
};
