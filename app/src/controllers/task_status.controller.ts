import { Request, Response } from 'express';
import TaskStatusDAO from '../dao/task_status.dao';
import { CreateTaskStatusDTO } from '../dto/task_status.dto';
import { ValidationError } from 'sequelize';

export class TaskStatusController {
    public static async getAllTaskStatuses(req: Request, res: Response): Promise<void> {
        try {
            const taskStatuses = await TaskStatusDAO.getAllTaskStatus();
            res.status(200).json(taskStatuses);
        } catch (error) {
            console.error('Error al obtener estados de tarea:', error);
            res.status(500).json({ message: 'Error interno del servidor al obtener estados de tarea.' });
        }
    }

    public static async getTaskStatusById(req: Request, res: Response): Promise<void> {
        const id_task_status = parseInt(req.params.id, 10);

        if (isNaN(id_task_status)) {
            res.status(400).json({ message: 'ID de estado de tarea inválido.' });
            return;
        }
        try {
            const taskStatus = await TaskStatusDAO.getTaskStatusById(id_task_status);
            if (taskStatus) {
                res.status(200).json(taskStatus);
            } else {
                res.status(404).json({ message: `Estado de tarea con ID ${id_task_status} no encontrado.` });
            }
        } catch (error) {
            console.error(`Error al obtener estado de tarea con ID ${id_task_status}:`, error);
            res.status(500).json({ message: 'Error interno del servidor.' });
        }
    }

    public static async createTaskStatus(req: Request, res: Response): Promise<void> {
        const taskStatusData: CreateTaskStatusDTO = req.body;
        if (!taskStatusData.name) {
            res.status(400).json({ message: 'El campo "name" es requerido.' });
            return;
        }
        try {
            const newTaskStatus = await TaskStatusDAO.createTaskStatus(taskStatusData);
            res.status(201).json(newTaskStatus);
        }
        catch (error) {
            if (error instanceof ValidationError) {
                res.status(400).json({ message: error.message });
            } else {
                console.error('Error al crear estado de tarea:', error);
                res.status(500).json({ message: 'Error interno del servidor al crear estado de tarea.' });
            }
        }
    }

    public static async updateTaskStatus(req: Request, res: Response): Promise<void> {
        const id_task_status = parseInt(req.params.id, 10);
        if (isNaN(id_task_status)) {
            res.status(400).json({ message: 'ID de estado de tarea inválido.' });
            return;
        }

        const updateData: Partial<CreateTaskStatusDTO> = req.body;

        try {
            const updatedTaskStatus = await TaskStatusDAO.updateTaskStatus(id_task_status, updateData);
            if (updatedTaskStatus) {
                res.status(200).json(updatedTaskStatus);
            } else {
                res.status(404).json({ message: `Estado de tarea con ID ${id_task_status} no encontrado.` });
            }
        } catch (error) {
            if (error instanceof ValidationError) {
                res.status(400).json({ message: error.message });
            } else {
                console.error(`Error al actualizar estado de tarea con ID ${id_task_status}:`, error);
                res.status(500).json({ message: 'Error interno del servidor al actualizar estado de tarea.' });
            }
        }
    }

    public static async deleteTaskStatus(req: Request, res: Response): Promise<void> {
        const id_task_status = parseInt(req.params.id, 10);
        if (isNaN(id_task_status)) {
            res.status(400).json({ message: 'ID de estado de tarea inválido.' });
            return;
        }

        try {
            const success = await TaskStatusDAO.deleteTaskStatus(id_task_status);
            if (success) {
                res.status(200).json({ message: `Estado de tarea con ID ${id_task_status} desactivado.` });
            } else {
                res.status(404).json({ message: `Estado de tarea con ID ${id_task_status} no encontrado o ya desactivado.` });
            }
        } catch (error) {
            console.error(`Error al desactivar estado de tarea con ID ${id_task_status}:`, error);
            res.status(500).json({ message: 'Error interno del servidor al desactivar estado de tarea.' });
        }
    }
}