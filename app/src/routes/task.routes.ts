import { Router } from 'express';
import { TaskController } from '../controllers/task.controller';
import { checkRole, ROLES } from '../middlewares/auth';
import { verifyToken } from '../middlewares/authJwt';

const router = Router();

router.get(
    '/', 
    verifyToken,
    checkRole([ROLES.USER, ROLES.ADMIN]),
    TaskController.getAllTasks);
router.get('/:id', TaskController.getTaskById);
router.post('/', TaskController.createTask);
router.put('/:id', TaskController.updateTask);
router.delete('/:id', TaskController.deleteTask);

export default router;