import { Router, Request, Response } from 'express';
import { FeatureRepository } from '../repositories/feature';
import { verifyUser } from '../middleware/authMiddleware';

const router = Router({ mergeParams: true });

router.get('/', verifyUser, FeatureRepository.GetFeaturesByUserId);
router.post('/', verifyUser, FeatureRepository.AddFeatures);
router.get('/:id', verifyUser, FeatureRepository.GetFeaturesById);
router.put('/:id', verifyUser, FeatureRepository.UpdateFeatures);
router.delete('/:id', verifyUser, FeatureRepository.DeleteFeatures);

export default router;