import { Router } from 'express';
import { AccessController } from '../controllers/access.controller';

const router = Router();

router.get('/', AccessController.getAllAccesses);
router.get('/:id', AccessController.getAccessById);
router.post('/', AccessController.createAccess);
router.put('/:id', AccessController.updateAccess);
router.delete('/:id', AccessController.deleteAccess);

export default router;