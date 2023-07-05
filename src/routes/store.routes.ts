import { Router, Request, Response } from 'express';

import { StoreRepository } from '../repositories/store';
import { verifyUser } from '../middleware/authMiddleware';

const router = Router({ mergeParams: true });

router.get('/', verifyUser, StoreRepository.GetStoresByUserId);
router.post('/', verifyUser, StoreRepository.AddStore);
router.get('/:id', verifyUser, StoreRepository.GetStoreById);
router.put('/:id', verifyUser, StoreRepository.UpdateStore);
router.delete('/:id', verifyUser, StoreRepository.DeleteStore);
router.get('/locations', StoreRepository.Location);

export default router;