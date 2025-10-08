import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { JwtPayload as BaseJwtPayload } from 'jsonwebtoken'; // Importamos el tipo base de jwt

// 🚨 PRÁCTICA DE SEGURIDAD: Usar variables de entorno.
const JWT_SECRET = process.env.JWT_SECRET; 

if (!JWT_SECRET) {
    // Si falta la clave crítica, terminamos el proceso para evitar riesgos.
    console.error("CRITICAL ERROR: JWT_SECRET environment variable is not set.");
    // Dependiendo de tu configuración de inicio, puedes lanzar un error o terminar el proceso.
    // throw new Error("JWT_SECRET missing."); 
}

// 1. Define la carga útil (Payload) del token
// Usamos 'extends BaseJwtPayload' para asegurar que TS sepa que nuestro payload tiene las propiedades estándar de JWT (iat, exp).
export interface JwtPayload extends BaseJwtPayload {
    id: number;
    roleId: number; // El campo que usará checkRole
    // Añade aquí cualquier otro campo que firmes en tu token.
}

// 2. Extiende la interfaz Request para adjuntar el usuario
// Permite que middlewares subsiguientes (como checkRole) accedan a req.user
interface AuthRequest extends Request {
    user?: JwtPayload;
}


/**
 * Middleware para verificar la validez del token JWT presente en el encabezado Authorization.
 */
export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    // 1. Obtener el token del encabezado (Ej: Authorization: Bearer <token>)
    const authHeader = req.headers['authorization'];
    const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

    // 2. Verificar si hay token
    if (!token) {
        return res.status(401).json({
            message: 'Acceso denegado. Se requiere un token de autenticación.',
        });
    }

    // 3. Verificar la validez del token
    try {
        // Verifica el token. Usamos un condicional 'if (JWT_SECRET)' para evitar un posible error
        // si el chequeo inicial falla, aunque la lógica de arriba ya lo debería atrapar.
        if (!JWT_SECRET) {
            return res.status(500).json({ message: 'Error de configuración del servidor.' });
        }
        
        // 💥 SOLUCIÓN AL ERROR DE TIPADO:
        // jwt.verify devuelve un tipo que incluye el tipo JwtPayload base. 
        // Lo casteamos directamente a nuestra interfaz JwtPayload para que TypeScript lo acepte.
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

        // 4. Adjuntar la carga útil decodificada a la petición
        req.user = decoded; 
        
        next();
    } catch (error) {
        // El token es inválido o ha expirado
        console.error("JWT Verification Error:", error);
        return res.status(403).json({
            message: 'Token inválido o expirado. Vuelve a iniciar sesión.',
        });
    }
};
