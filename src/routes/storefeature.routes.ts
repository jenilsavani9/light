import { Router, Request, Response } from 'express';
import { FeatureRepository } from '../repositories/feature';
import { verifyUser } from '../middleware/authMiddleware';

const router = Router({ mergeParams: true });

router.get('/store', verifyUser, FeatureRepository.GetFeaturesByStoreId);
router.post('/', verifyUser, FeatureRepository.AddStoreFeatures);

export default router;