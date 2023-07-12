import { Router } from 'express';
import { UserRepository } from '../repositories/user';
import { verifyAdmin, verifyUser } from '../middleware/authMiddleware';

const router = Router({ mergeParams: true });

router.post('/add', verifyUser, verifyAdmin, UserRepository.AddUser);
router.get('/get', verifyUser, verifyAdmin, UserRepository.GetUserList);
router.delete('/delete', verifyUser, verifyAdmin, UserRepository.DeleteUser);

export default router;