import { Request, Response } from 'express';
import TaskDAO from '../dao/task.dao';
import { CreateTaskDTO } from '../dto/task.dto';
import { ValidationError } from 'sequelize';

export class TaskController {
    public static async getAllTasks(req: Request, res: Response): Promise<void> {
        try {
            const tasks = await TaskDAO.getAllTasks();
            res.status(200).json(tasks);
        } catch (error) {
            console.error('Error al obtener tareas:', error);
            res.status(500).json({ message: 'Error interno del servidor al obtener tareas.' });
        }
    }

    public static async getTaskById(req: Request, res: Response): Promise<void> {
        const id_task = parseInt(req.params.id, 10);
        if (isNaN(id_task)) {
            res.status(400).json({ message: 'ID de tarea inválido.' });
            return;
        }
        try {
            const task = await TaskDAO.getTaskById(id_task);
            if (task) {
                res.status(200).json(task);
            } else {
                res.status(404).json({ message: `Tarea con ID ${id_task} no encontrada.` });
            }
        } catch (error) {
            console.error(`Error al obtener tarea con ID ${id_task}:`, error);
            res.status(500).json({ message: 'Error interno del servidor.' });
        }
    }

    public static async createTask(req: Request, res: Response): Promise<void> {
        const taskData: CreateTaskDTO = req.body;
        if (!taskData.name) {
            res.status(400).json({ message: 'El campo "nombre" es requerido.' });
            return;
        }
        try {
            const newTask = await TaskDAO.createTask(taskData);
            res.status(201).json(newTask);
        }
        catch (error) {
            if (error instanceof ValidationError) {
                res.status(400).json({ message: error.message });
            } else {
                console.error('Error al crear tarea:', error);
                res.status(500).json({ message: 'Error interno del servidor al crear tarea.' });
            }
        }
    }

    public static async updateTask(req: Request, res: Response): Promise<void> {
        const id_task = parseInt(req.params.id, 10);
        if (isNaN(id_task)) {
            res.status(400).json({ message: 'ID de tarea inválido.' });
            return;
        }
        const updateData: Partial<CreateTaskDTO> = req.body;
        try {
            const updatedTask = await TaskDAO.updateTask(id_task, updateData);
            if (updatedTask) {
                res.status(200).json(updatedTask);
            } else {
                res.status(404).json({ message: `Tarea con ID ${id_task} no encontrada.` });
            }
        } catch (error) {
            console.error(`Error al actualizar tarea con ID ${id_task}:`, error);
            res.status(500).json({ message: 'Error interno del servidor al actualizar tarea.' });
        }
    }

    public static async deleteTask(req: Request, res: Response): Promise<void> {
        const id_task = parseInt(req.params.id, 10);
        if (isNaN(id_task)) {
            res.status(400).json({ message: 'ID de tarea inválido.' });
            return;
        }
        try {
            const wasDeleted = await TaskDAO.deleteTask(id_task);
            if (wasDeleted) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: `Tarea con ID ${id_task} no encontrada.` });
            }
        } catch (error) {
            console.error(`Error al eliminar tarea con ID ${id_task}:`, error);
            res.status(500).json({ message: 'Error interno del servidor al eliminar tarea.' });
        }
    }
}