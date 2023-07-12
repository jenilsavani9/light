import { Router } from 'express';

import { StoreRepository } from '../repositories/store';
import { verifyUser } from '../middleware/authMiddleware';

const router = Router({ mergeParams: true });

router.get('/', verifyUser, StoreRepository.GetStoresByUserId);
router.post('/', verifyUser, StoreRepository.AddStore);
router.get('/locations', StoreRepository.Location);
router.get('/country', StoreRepository.GetCountry);
router.get('/country/:id/state', StoreRepository.GetState);
router.get('/state/:id/city', StoreRepository.GetCity);
router.get('/:id', verifyUser, StoreRepository.GetStoreById);
router.put('/:id', verifyUser, StoreRepository.UpdateStore);
router.delete('/:id', verifyUser, StoreRepository.DeleteStore);

export default router;