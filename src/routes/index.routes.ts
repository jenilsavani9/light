import user from './user.routes';
import admin from './admin.routes';
import feature from './feature.routes';
import store from './store.routes';
import storefeature from './storefeature.routes';
import file from './file.routes';

import { Router } from 'express';
import { Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Status Check');
});

router.use('/api/User', user);
router.use('/api/admin/User', admin);
router.use('/api/feature', feature);
router.use('/api/store', store);
router.use('/api/storefeature', storefeature);
router.use('/api/file', file);


export default router;