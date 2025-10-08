// src/controllers/group-task.controller.ts

import { Request, Response } from 'express';
import GroupTaskDAO from '../dao/group_task.dao';
import { CreateGroupTaskDTO, UpdateGroupTaskDTO } from '../dto/group_task.dto';
import { ValidationError } from 'sequelize';

export class GroupTaskController {
    /**
     * Obtiene todas las tareas de grupo.
     */
    public static async getAllGroupTasks(req: Request, res: Response): Promise<void> {
        try {
            const groupTasks = await GroupTaskDAO.getAllGroupTasks();
            res.status(200).json(groupTasks);
        } catch (error) {
            console.error('Error al obtener tareas de grupo:', error);
            res.status(500).json({ message: 'Error interno del servidor al obtener tareas de grupo.' });
        }
    }

    /**
     * Obtiene una tarea de grupo por ID.
     */
    public static async getGroupTaskById(req: Request, res: Response): Promise<void> {
        const id_group_task = parseInt(req.params.id, 10);
        if (isNaN(id_group_task)) {
            res.status(400).json({ message: 'ID de tarea de grupo inválido.' });
            return;
        }
        try {
            const groupTask = await GroupTaskDAO.getGroupTaskById(id_group_task);
            if (groupTask) {
                res.status(200).json(groupTask);
            } else {
                res.status(404).json({ message: `Tarea de grupo con ID ${id_group_task} no encontrada.` });
            }
        } catch (error) {
            console.error(`Error al obtener tarea de grupo con ID ${id_group_task}:`, error);
            res.status(500).json({ message: 'Error interno del servidor.' });
        }
    }

    /**
     * Crea una nueva tarea de grupo.
     */
    public static async createGroupTask(req: Request, res: Response): Promise<void> {
        const groupTaskData: CreateGroupTaskDTO = req.body;
        
        // Validación básica de campos requeridos (basada en el modelo: 'name' y 'date' son NOT NULL)
        if (!groupTaskData.name || !groupTaskData.date) {
            res.status(400).json({ message: 'Los campos "name" y "date" son requeridos.' });
            return;
        }
        
        try {
            const newGroupTask = await GroupTaskDAO.createGroupTask(groupTaskData);
            res.status(201).json(newGroupTask);
        }
        catch (error) {
            if (error instanceof ValidationError) {
                // Manejo de errores de validación de Sequelize
                res.status(400).json({ message: error.message });
            } else {
                console.error('Error al crear tarea de grupo:', error);
                res.status(500).json({ message: 'Error interno del servidor al crear tarea de grupo.' });
            }
        }
    }

    /**
     * Actualiza una tarea de grupo por ID.
     */
    public static async updateGroupTask(req: Request, res: Response): Promise<void> {
        const id_group_task = parseInt(req.params.id, 10);
        if (isNaN(id_group_task)) {
            res.status(400).json({ message: 'ID de tarea de grupo inválido.' });
            return;
        }
        // Usamos UpdateGroupTaskDTO ya que todos los campos son opcionales
        const updateData: UpdateGroupTaskDTO = req.body; 
        
        try {
            const updatedGroupTask = await GroupTaskDAO.updateGroupTask(id_group_task, updateData);
            if (updatedGroupTask) {
                res.status(200).json(updatedGroupTask);
            } else {
                res.status(404).json({ message: `Tarea de grupo con ID ${id_group_task} no encontrada.` });
            }
        } catch (error) {
            console.error(`Error al actualizar tarea de grupo con ID ${id_group_task}:`, error);
            res.status(500).json({ message: 'Error interno del servidor al actualizar tarea de grupo.' });
        }
    }

    /**
     * Elimina lógicamente (desactiva) una tarea de grupo por ID.
     */
    public static async deleteGroupTask(req: Request, res: Response): Promise<void> {
        const id_group_task = parseInt(req.params.id, 10);
        if (isNaN(id_group_task)) {
            res.status(400).json({ message: 'ID de tarea de grupo inválido.' });
            return;
        }
        try {
            // El DAO realiza una "eliminación lógica" (is_active = false)
            const wasDeleted = await GroupTaskDAO.deleteGroupTask(id_group_task);
            if (wasDeleted) {
                // 204 No Content es la respuesta estándar para una eliminación exitosa sin cuerpo de respuesta
                res.status(204).send(); 
            } else {
                res.status(404).json({ message: `Tarea de grupo con ID ${id_group_task} no encontrada o ya inactiva.` });
            }
        } catch (error) {
            console.error(`Error al eliminar tarea de grupo con ID ${id_group_task}:`, error);
            res.status(500).json({ message: 'Error interno del servidor al eliminar tarea de grupo.' });
        }
    }
}