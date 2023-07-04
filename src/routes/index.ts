import user from './user.routes';

import { Router } from 'express';
import { Request, Response } from 'express';
const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Status Check');
});

router.use('/api/User', user);
export default router;