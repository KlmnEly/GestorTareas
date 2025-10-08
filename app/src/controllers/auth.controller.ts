// src/controllers/auth.controller.ts

import { Request, Response } from 'express'; // Importamos tipos de Express para evitar 'any' implícito
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Access from '../models/accesses.model'; // Importamos tu modelo de Sequelize
import { AccessesAttributes } from '../models/accesses.model';

const JWT_SECRET = process.env.JWT_SECRET || 'P45T3l1t0D3P0Oll0';
;

// Definimos el tipo de Request Body para mayor seguridad en TypeScript
interface LoginRequestBody {
    username: string;
    password: string;
}

/**
 * Maneja la lógica de inicio de sesión: verifica credenciales y emite un JWT.
 */
export const login = async (req: Request<{}, {}, LoginRequestBody>, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Se requieren nombre de usuario y contraseña.' });
    }

    try {
        // 1. Buscar la entrada de acceso por nombre de usuario
        const access = await Access.findOne({ 
            where: { username } 
        }) as AccessesAttributes | null; // Casteamos el resultado para tipado

        if (!access) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // 2. Comparar la contraseña encriptada (asume que bcrypt está siendo usado)
        const isMatch = await bcrypt.compare(password, access.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }
        
        // 3. Crear el Payload del JWT (Alineado con tus interfaces de middleware)
        const payload = {
            // Se mapea a 'id' para coincidir con JwtPayload
            id: access.id_access, 
            
            // Se mapea a 'roleId' para coincidir con JwtPayload y checkRole
            roleId: access.role_id, 
            
            // Puedes incluir otros datos si son relevantes
            username: access.username,
        };

        // 4. Generar el Token (expira en 1 hora)
        const token = jwt.sign(
            payload, 
            JWT_SECRET, 
            { expiresIn: '1h' } 
        );

        // 5. Devolver la respuesta con el token
        return res.status(200).json({
            message: 'Login exitoso',
            token, // El cliente debe almacenar este token
            user_data: {
                id: access.id_access,
                username: access.username,
                roleId: access.role_id
            }
        });

    } catch (error) {
        console.error('Error durante el login:', error);
        return res.status(500).json({ message: 'Error interno del servidor.' });
    }
};