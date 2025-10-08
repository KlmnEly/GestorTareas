import { Router } from 'express';
import { GroupTaskController } from '../controllers/group_task.controller';

const router = Router();

router.get('/', GroupTaskController.getAllGroupTasks);
router.get('/:id', GroupTaskController.getGroupTaskById);
router.post('/', GroupTaskController.createGroupTask);
router.put('/:id', GroupTaskController.updateGroupTask);
router.delete('/:id', GroupTaskController.deleteGroupTask);

export default router;