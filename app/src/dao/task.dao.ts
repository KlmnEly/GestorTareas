import { Task } from "../models";
import { CreateTaskDTO, UpdateTaskDTO, TaskResponseDTO, toTaskResponseDTO } from "../dto/task.dto";
import { TaskAttributes } from "../models/tasks.model";

class TaskDAO {
    public static async getAllTasks(): Promise<TaskResponseDTO[]> {
        const tasks = await Task.findAll({
            attributes: ['id_task', 'user_id', 'task_status_id', 'name', 'description', 'date', 'is_active']
        });

        return tasks.map(task => toTaskResponseDTO(task.get()));
    }

    public static async getTaskById(id_task: number): Promise<TaskResponseDTO | null> {
        const task = await Task.findByPk(id_task);
        if (!task) {
            return null;
        }

        return toTaskResponseDTO(task.get());
    }

    public static async createTask(taskData: CreateTaskDTO): Promise<TaskResponseDTO> {
        const newTask = await Task.create({
            ...taskData,
            date: taskData.date ? new Date(taskData.date) : new Date(),
            is_active: taskData.is_active ?? true,
        } as TaskAttributes);

        return toTaskResponseDTO(newTask.get());
    }

    public static async updateTask(id_task: number, updateData: UpdateTaskDTO): Promise<TaskResponseDTO | null> {
        if (updateData.date) {
            updateData.date = new Date(updateData.date);
        }
        const [rowsAffected, [updatedTask]] = await Task.update(updateData, {
            where: { id_task },
            returning: true,
        });

        if (rowsAffected === 0) {
            return null;
        }

        return toTaskResponseDTO(updatedTask.get());
    }

    public static async deleteTask(id_task: number): Promise<boolean> {
        const [rowsAffected] = await Task.update({ is_active: false }, {
            where: { id_task, is_active: true },
            returning: true,
        });
        return rowsAffected > 0;
    }
}

export default TaskDAO;