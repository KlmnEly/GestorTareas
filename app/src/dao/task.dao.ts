import { Task } from "../models";
import { CreateTaskDTO, UpdateTaskDTO, TaskResponseDTO, toTaskResponseDTO } from "../dto/task.dto";
import { TaskAttributes } from "../models/tasks.model";
import User from "../models/users.model"; // Importa los modelos asociados
import TaskStatus from "../models/task_status.model";
import GroupTask from "../models/group_tasks.model";
import { FindOptions } from "sequelize";

// Opciones de inclusión para Sequelize
// Usamos los 'as' definidos en applyAssociations.ts
const includeOptions: FindOptions['include'] = [
    { model: User, as: 'user' },
    { model: TaskStatus, as: 'taskStatus' },
    { model: GroupTask, as: 'groupTask' },
];

class TaskDAO {
    public static async getAllTasks(): Promise<TaskResponseDTO[]> {
        const tasks = await Task.findAll({
            // Agrega las opciones de inclusión aquí
            include: includeOptions, 
            attributes: ['id_task', 'group_task_id', 'user_id', 'task_status_id', 'name', 'description', 'date', 'is_active']
        });

        // Asegúrate de usar .map() para formatear todas las tareas
        return tasks.map(task => toTaskResponseDTO(task.get()));
    }

    public static async getTaskById(id_task: number): Promise<TaskResponseDTO | null> {
        const task = await Task.findByPk(id_task, {
            // Agrega las opciones de inclusión aquí
            include: includeOptions,
        });
        if (!task) {
            return null;
        }

        // Asegúrate de formatear la tarea
        return toTaskResponseDTO(task.get());
    }

    // Los métodos createTask, updateTask y deleteTask no necesitan 'include'
    // ya que solo escriben en la tabla principal, pero el DTO debe manejar
    // las relaciones si quieres que la respuesta del POST/PUT las incluya.
    // Vamos a modificarlos para que sí incluyan los datos en la respuesta.

    public static async createTask(taskData: CreateTaskDTO): Promise<TaskResponseDTO> {
        const newTask = await Task.create({
            ...taskData,
            date: taskData.date ? new Date(taskData.date) : new Date(),
            is_active: taskData.is_active ?? true,
        } as TaskAttributes);

        // Volver a buscar la tarea recién creada con las inclusiones
        const createdTaskWithIncludes = await Task.findByPk(newTask.id_task, {
             include: includeOptions,
        });

        if (!createdTaskWithIncludes) {
            // Manejo de error si no se encuentra (debería ser raro)
            throw new Error('Tarea creada pero no se pudo recuperar con relaciones.');
        }

        return toTaskResponseDTO(createdTaskWithIncludes.get());
    }

    public static async updateTask(id_task: number, updateData: UpdateTaskDTO): Promise<TaskResponseDTO | null> {
        if (updateData.date) {
            updateData.date = new Date(updateData.date);
        }
        
        // La actualización no usa 'returning: true' con inclusión, así que actualizamos y luego buscamos
        const [rowsAffected] = await Task.update(updateData, {
            where: { id_task },
        });

        if (rowsAffected === 0) {
            return null; // No se encontró o no se actualizó nada
        }

        // Buscar la tarea actualizada con las inclusiones
        const updatedTask = await Task.findByPk(id_task, {
            include: includeOptions,
        });

        if (!updatedTask) {
             return null; // Manejo de error si la tarea se borró justo después de actualizar (raro)
        }

        return toTaskResponseDTO(updatedTask.get());
    }
    
    public static async deleteTask(id_task: number): Promise<boolean> {
        const rowsAffected = await Task.destroy({
            where: { id_task },
        });

        return rowsAffected > 0;
    }
}

export default TaskDAO;