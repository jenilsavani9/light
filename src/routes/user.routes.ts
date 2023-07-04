import { Router, Request, Response } from 'express';
import { UserRepository } from '../repositories/user';


const router = Router({ mergeParams: true });

router.post('/login', UserRepository.userLogin);
router.get('/register', UserRepository.getUserList);

export default router;