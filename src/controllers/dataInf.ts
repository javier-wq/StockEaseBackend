import { Request, Response } from "express";
import fs from "fs";
import { handlerHttp } from "../utils/error.handler";
import { uploadImage, deleteImage } from "../utils/cloudinary.handler";
import {
  insertdataInf,
  readDatasInf,
  readDataInf,
  putdataInf,
  dropdataInf,
} from "../services/dataInf";
import {
  insertImage,
  readImage,
  dropImage,
} from "../services/images";
import { UploadedFile } from "express-fileupload";

const getDataInf = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await readDataInf(id);

    if (!response) {
      return res.status(404).send("NOT_FOUND");
    }

    res.send(response);
  } catch (e) {
    console.error(e);
    handlerHttp(res, "ERROR_GET_DATAINF");
  }
};

const getAllDataInfs = async (req: Request, res: Response) => {
  try {
    const response = await readDatasInf();
    res.send(response);
  } catch (e) {
    handlerHttp(res, "ERROR_GET_ALL_DATAINFS");
  }
};

const updateDataInf = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const response = await putdataInf(id, data);
    res.send(response);
  } catch (e) {
    handlerHttp(res, "ERROR_UPDATE_DATAINF");
  }
};

const postDataInf = async (req: Request, res: Response) => {
  try {
    const data: any = req.body;

    // Función para procesar y subir imágenes a Cloudinary
    const processAndUploadImages = async (fieldName: string) => {
      if (req.files && req.files[fieldName]) {
        let files = req.files[fieldName] as UploadedFile | UploadedFile[];

        if (!Array.isArray(files)) {
          files = [files];
        }

        const results = await Promise.all(
          files.map(async (file) => {
            const result = await uploadImage(file.tempFilePath);
            fs.unlinkSync(file.tempFilePath); // Eliminar archivo local después de subir a Cloudinary
            // Insertar la imagen utilizando el servicio Image
            const image = await insertImage({
              public_id: result.public_id,
              secure_url: result.secure_url,
            });
            return image._id; // Devolver el ID de la imagen guardada
          })
        );

        data.images = results; // Asignar los IDs de las imágenes al campo correspondiente en data
      }
    };

    // Llamar a la función para procesar las imágenes
    await processAndUploadImages("images");

    // Insertar los datos en la base de datos
    const response = await insertdataInf(data);
    res.send(response);
  } catch (error) {
    console.error(error);
    res.status(500).send("INTERNAL_SERVER_ERROR");
  }
};

const deleteDataInf = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data: any = await readDataInf(id);

    if (!data) {
      return res.status(404).send("NOT_FOUND");
    }

    // Eliminar imágenes asociadas si existen
    const deleteImages = async (imageIds: any[]) => {
      if (imageIds) {
        // Eliminar las imágenes utilizando el servicio Image
        await Promise.all(imageIds.map(async (id) => {
          await deleteImage(id); // Eliminar la imagen de Cloudinary
          await dropImage(id); // Eliminar la imagen de la base de datos
        }));
      }
    };

    await deleteImages(data.images); // Llamar a la función para eliminar imágenes

    // Eliminar los datos de la base de datos
    const response = await dropdataInf(id);
    res.send(response);
  } catch (e) {
    console.error(e);
    handlerHttp(res, "ERROR_DELETE_DATAINF");
  }
};

export {
  getDataInf,
  getAllDataInfs,
  updateDataInf,
  postDataInf,
  deleteDataInf,
};
