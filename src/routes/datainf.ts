import { Router } from "express";
import { checkJWT } from "../middleware/session";
import {
    deleteDataInf,
    getDataInf,
    getAllDataInfs,
    postDataInf,
    updateDataInf,
} from "../controllers/dataInf";

const router = Router();

router.get("/", getAllDataInfs);

router.get("/:id", getDataInf);

router.post("/", postDataInf);

router.put("/:id", updateDataInf);

router.delete("/:id", deleteDataInf);

export { router };
