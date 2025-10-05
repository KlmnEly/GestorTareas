import { Request, Response } from 'express';
import UserDAO, { CreateUserAndAccessDTO } from '../dao/user.dao'; 
import { UpdateUserDTO } from '../dto/user.dto'; 
import { ValidationError, UniqueConstraintError } from 'sequelize';
import { UserResponseDTO } from '../dto/user.dto';

export class UserController {

    public static async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await UserDAO.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            console.error('Error al obtener todos los usuarios:', error);
            res.status(500).json({ message: 'Error interno del servidor al obtener usuarios.' });
        }
    }

    public static async getUserById(req: Request, res: Response): Promise<void> {
        const id_user = parseInt(req.params.id, 10);

        if (isNaN(id_user)) {
            res.status(400).json({ message: 'ID de usuario inválido.' });
            return;
        }

        try {
            const user = await UserDAO.getUserById(id_user);

            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: `Usuario con ID ${id_user} no encontrado.` });
            }
        } catch (error) {
            console.error(`Error al obtener usuario con ID ${id_user}:`, error);
            res.status(500).json({ message: 'Error interno del servidor.' });
        }
    }

    public static async createUser(req: Request, res: Response): Promise<void> {
        const userData: CreateUserAndAccessDTO = req.body;

        if (!userData.document_number || !userData.email || !userData.username || !userData.password) {
            res.status(400).json({ message: 'Los campos de identificación (número de documento, email) y acceso (username, password) son requeridos.' });
            return;
        }

        try {
            const newUser: UserResponseDTO = await UserDAO.createFullUser(userData);
            res.status(201).json(newUser);
        } catch (error) {
            if (error instanceof UniqueConstraintError) {
                const targetField = error.fields ? Object.keys(error.fields)[0] : 'unknown field';
                res.status(400).json({ message: `Error de unicidad: El valor para el campo '${targetField}' ya está en uso.`, details: error.errors.map(e => e.message) });
            } else if (error instanceof ValidationError) {
                 res.status(400).json({ message: 'Error de validación: los datos son inválidos.', details: error.errors.map(e => e.message) });
            } else {
                console.error('Error al crear usuario:', error);
                res.status(500).json({ message: 'Error interno del servidor al crear el usuario y su acceso.' });
            }
        }
    }

    public static async updateUser(req: Request, res: Response): Promise<void> {
        const id_user = parseInt(req.params.id, 10);

        const updateData: UpdateUserDTO = req.body; 

        if (isNaN(id_user)) {
            res.status(400).json({ message: 'ID de usuario inválido.' });
            return;
        }

        try {
            const updatedUser = await UserDAO.updateExistingUser(id_user, updateData);

            if (updatedUser) {
                res.status(200).json(updatedUser);
            } else {
                res.status(404).json({ message: `Usuario con ID ${id_user} no encontrado.` });
            }
        } catch (error) {
            if (error instanceof UniqueConstraintError) {
                const targetField = error.fields ? Object.keys(error.fields)[0] : 'unknown field';
                res.status(400).json({ message: `Error de unicidad: El valor para el campo '${targetField}' ya está en uso.`, details: error.errors.map(e => e.message) });
            } else {
                console.error(`Error al actualizar usuario con ID ${id_user}:`, error);
                res.status(500).json({ message: 'Error interno del servidor al actualizar el usuario.' });
            }
        }
    }

    public static async deleteUser(req: Request, res: Response): Promise<void> {
        const id_user = parseInt(req.params.id, 10);

        if (isNaN(id_user)) {
            res.status(400).json({ message: 'ID de usuario inválido.' });
            return;
        }

        try {
            const wasDeleted = await UserDAO.deleteUser(id_user); 

            if (wasDeleted) {
                res.status(204).send(); 
            } else {
                res.status(404).json({ message: `Usuario con ID ${id_user} no encontrado o ya estaba inactivo.` });
            }
        } catch (error) {
            console.error(`Error al desactivar usuario con ID ${id_user}:`, error);
            res.status(500).json({ message: 'Error interno del servidor al desactivar el usuario.' });
        }
    }
}