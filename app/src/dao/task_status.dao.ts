import TaskStatus from '../models/task_status.model'; 
import { CreateTaskStatusDTO, TaskStatusResponseDTO, toTaskStatusResponseDTO } from '../dto/task_status.dto';
import { TaskStatusAttributes } from '../models/task_status.model';

class TaskStatusDAO {
    
    public static async getAllTaskStatus(): Promise<TaskStatusResponseDTO[]> {
        const task_status = await TaskStatus.findAll({
            attributes: ['id_task_status', 'name', 'is_active'] 
        });
        
        return task_status.map(task_status => toTaskStatusResponseDTO(task_status.get()));
    }

    public static async getTaskStatusById(id_task_status: number): Promise<TaskStatusResponseDTO | null> {
        const task_status = await TaskStatus.findByPk(id_task_status);
        
        if (!task_status) {
            return null;
        }
        
        return toTaskStatusResponseDTO(task_status.get());
    }

    public static async createTaskStatus(taskStatusData: CreateTaskStatusDTO): Promise<TaskStatusResponseDTO> {
        const newTaskStatus = await TaskStatus.create(taskStatusData as TaskStatusAttributes); 
        
        return toTaskStatusResponseDTO(newTaskStatus.get());
    }

    public static async updateTaskStatus(
        id_task_status: number, 
        updateData: Partial<CreateTaskStatusDTO>
    ): Promise<TaskStatusResponseDTO | null> {
        const [rowsAffected, [updatedTaskStatus]] = await TaskStatus.update(updateData, {
            where: { id_task_status },
            returning: true, 
        });

        if (rowsAffected === 0) {
            return null;
        }
        
        return toTaskStatusResponseDTO(updatedTaskStatus.get());
    }

    public static async deleteTaskStatus(id_task_status: number): Promise<boolean> {
        const [rowsAffected] = await TaskStatus.update({ is_active: false }, {
            where: { id_task_status, is_active: true }
        });

        return rowsAffected > 0;
    }
}

export default TaskStatusDAO;