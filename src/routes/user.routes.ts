import { Router } from 'express';
import { UserRepository } from '../repositories/user';
import { verifyUser } from '../middleware/authMiddleware';


const router = Router({ mergeParams: true });

router.post('/login', UserRepository.userLogin);
router.get('/validate', UserRepository.Validate);
router.post('/resetpassword', verifyUser, UserRepository.ResetPassword);
router.post('/forgotpassword', verifyUser, UserRepository.ForgotPassword);
router.post('/passwordchange', verifyUser, UserRepository.ChangePassword); 

export default router;