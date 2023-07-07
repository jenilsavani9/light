import { Router, Request, Response } from "express";
import multer from "multer";

import { FileRepository } from "../repositories/file";

const upload = multer();
const router = Router({ mergeParams: true });

router.post("/Upload", upload.any(), FileRepository.FileStore);

export default router;
