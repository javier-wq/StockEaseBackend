import { datainf } from "../interfaces/datainf.interface";
import dataInfModel from "../models/dataInf";

const insertdataInf = async (data: datainf) => {
  const responseInsert = await dataInfModel.create(data);
  return responseInsert;
};

const readDatasInf = async () => {
  const responseSites = await dataInfModel.find({}).lean();
  return responseSites;
};

const readDataInf = async (id: string) => {
  const responseSite = await dataInfModel.findOne({ _id: id }).lean();
  return responseSite;
};

const putdataInf = async (id: string, data: datainf) => {
  const responseSite = await dataInfModel.findByIdAndUpdate(
    { _id: id },
    data,
    {
      new: true,
    }
  ).lean();
  return responseSite;
};

const dropdataInf = async (id: string) => {
  const responseSite = await dataInfModel.deleteOne({ _id: id });
  return responseSite;
};

export {
  insertdataInf,
  readDatasInf,
  readDataInf,
  putdataInf,
  dropdataInf,
};
