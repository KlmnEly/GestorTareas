import { Router } from 'express';
import { TaskStatusController } from '../controllers/task_status.controller';

const router = Router();

router.get('/', TaskStatusController.getAllTaskStatuses);
router.get('/:id', TaskStatusController.getTaskStatusById);
router.post('/', TaskStatusController.createTaskStatus);
router.put('/:id', TaskStatusController.updateTaskStatus);
router.delete('/:id', TaskStatusController.deleteTaskStatus);

export default router;