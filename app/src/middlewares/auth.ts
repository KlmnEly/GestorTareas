import { Request, Response, NextFunction } from 'express';

// 1. Definición de IDs de Roles
// Usar un enum o un objeto constante es la mejor práctica en TypeScript.
export const ROLES = {
    USER: 1,
    ADMIN: 2,
};

// 2. Extensión del objeto Request de Express
// Necesitas informar a TypeScript que 'req.user' existe y qué tipo de datos tiene.
// Asume que tu middleware de autenticación (verifyToken) adjunta 'user' a la petición.
interface UserPayload {
    id: number;
    // Asegúrate de que este nombre de campo (roleId) coincida con lo que viene en tu token/DB
    roleId: number; 
    // Puedes añadir otros campos como name o email si los necesitas
}

// Extiende la interfaz Request para incluir req.user
interface AuthRequest extends Request {
    user?: UserPayload; // Hacemos 'user' opcional por seguridad en caso de fallos
}


/**
 * Middleware para verificar si el usuario autenticado tiene uno de los roles requeridos.
 * @param requiredRoles Array de IDs de rol permitidos (ej: [ROLES.ADMIN])
 * @returns Función de middleware de Express
 */
export const checkRole = (requiredRoles: number[]) => {
    // Usamos AuthRequest para tipar correctamente la petición
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        
        // 1. Verificación de Autenticación
        if (!req.user || !req.user.roleId) {
            // Este error se suele deber a que verifyToken falló o no se ejecutó.
            return res.status(401).json({
                message: 'Acceso denegado. Se requiere autenticación y rol de usuario.',
            });
        }

        const userRoleId = req.user.roleId;

        // 2. Verificación de Rol
        if (requiredRoles.includes(userRoleId)) {
            // El usuario tiene el rol correcto.
            next();
        } else {
            // El usuario no tiene permiso.
            return res.status(403).json({
                message: 'Permiso denegado. No tienes el rol necesario para esta operación.',
            });
        }
    };
};
