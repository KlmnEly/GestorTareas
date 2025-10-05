import { Router } from 'express';
import { RoleController } from '../controllers/role.controller'; // Asegúrate de la ruta correcta

const router = Router();

/**
 * Rutas para la gestión de Roles (/api/roles)
 * * NOTA: En una aplicación real, probablemente añadirías middleware de autenticación/autorización
 * antes de cada controlador (ej. router.get('/', isAuthenticated, RoleController.getAllRoles);)
 */

// GET todos los roles
router.get('/', RoleController.getAllRoles);

// GET un rol por ID
router.get('/:id', RoleController.getRoleById);

// POST crear un nuevo rol
router.post('/', RoleController.createRole);

// PUT actualizar un rol por ID
router.put('/:id', RoleController.updateRole);

// DELETE desactivar (borrado lógico) un rol por ID
router.delete('/:id', RoleController.deleteRole);

export default router;
