import { Router, Request, Response } from "express";
import { FileRepository } from "../repositories/file";

const router = Router({ mergeParams: true });

router.post("/Upload", FileRepository.FileStore);

export default router;
