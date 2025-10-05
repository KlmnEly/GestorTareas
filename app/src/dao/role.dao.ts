import Role from '../models/roles.model'; 
import { CreateRoleDTO, RoleResponseDTO, toRoleResponseDTO } from '../dto/role.dto';
import { RoleAttributes } from '../models/roles.model';

// DAO: Objeto de Acceso a Datos para el modelo Role
class RoleDAO {
    
    /**
     * Obtiene todos los roles de la base de datos.
     * @returns Una lista de RoleResponseDTO.
     */
    public static async getAllRoles(): Promise<RoleResponseDTO[]> {
        const roles = await Role.findAll({
            attributes: ['id_role', 'name', 'is_active'] 
        });
        
        // Mapeamos el resultado de Sequelize a nuestro DTO de respuesta
        return roles.map(role => toRoleResponseDTO(role.get()));
    }

    /**
     * Obtiene un rol por su ID.
     * @param id_role El ID del rol.
     * @returns RoleResponseDTO o null si no se encuentra.
     */
    public static async getRoleById(id_role: number): Promise<RoleResponseDTO | null> {
        const role = await Role.findByPk(id_role);
        
        if (!role) {
            return null;
        }
        
        // Mapeamos el resultado de Sequelize al DTO de respuesta
        return toRoleResponseDTO(role.get());
    }

    /**
     * Crea un nuevo rol.
     * @param roleData Los datos del nuevo rol (CreateRoleDTO).
     * @returns El rol recién creado como RoleResponseDTO.
     */
    public static async createRole(roleData: CreateRoleDTO): Promise<RoleResponseDTO> {
        const newRole = await Role.create(roleData as RoleAttributes); 
        
        // Mapeamos y devolvemos el DTO de respuesta
        return toRoleResponseDTO(newRole.get());
    }

    /**
     * Actualiza un rol existente.
     * @param id_role El ID del rol a actualizar.
     * @param updateData Los datos a actualizar (partial CreateRoleDTO).
     * @returns El rol actualizado como RoleResponseDTO o null si no se encuentra.
     */
    public static async updateRole(
        id_role: number, 
        updateData: Partial<CreateRoleDTO>
    ): Promise<RoleResponseDTO | null> {
        const [rowsAffected, [updatedRole]] = await Role.update(updateData, {
            where: { id_role },
            returning: true, // Importante para PostgreSQL para obtener la fila actualizada
        });

        if (rowsAffected === 0) {
            return null;
        }
        
        // Mapeamos y devolvemos el DTO de respuesta
        return toRoleResponseDTO(updatedRole.get());
    }

    /**
     * Elimina (desactiva) un rol.
     * @param id_role El ID del rol a eliminar.
     * @returns true si se eliminó, false si no se encontró.
     */
    public static async deleteRole(id_role: number): Promise<boolean> {
        // En lugar de usar destroy(), es mejor hacer un borrado lógico (actualizar is_active)
        const [rowsAffected] = await Role.update({ is_active: false }, {
            where: { id_role, is_active: true }
        });

        return rowsAffected > 0;
    }
}

export default RoleDAO;