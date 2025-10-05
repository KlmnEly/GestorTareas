// user.dao.ts

import User from '../models/users.model'; //
import Access, { AccessesAttributes } from '../models/accesses.model';
import { CreateUserDTO, UpdateUserDTO, UserResponseDTO, toUserResponseDTO } from '../dto/user.dto'; 
import { CreateAccessDTO } from '../dto/access.dto'; 
import { UsersAttributes } from '../models/users.model'; 
import bcrypt from 'bcrypt';
import sequelize from '../config/database';

// DTO para la carga útil combinada de creación (User + Access)
export interface CreateUserAndAccessDTO extends CreateUserDTO, CreateAccessDTO {
    // Hereda todos los campos de ambos DTOs.
}

class UserDAO {

    /**
     * Crea un nuevo registro de Access y un nuevo registro de User en una sola transacción.
     * Esto garantiza que ambos se creen correctamente o ninguno se cree.
     * @param data - Datos combinados de usuario y acceso.
     */
    public static async createFullUser(data: CreateUserAndAccessDTO): Promise<UserResponseDTO> {
        // Iniciar una transacción administrada por Sequelize
        const result = await sequelize.transaction(async (t) => {
            
            const hashedPassword = await bcrypt.hash(data.password, 10);
            
            const accessDataToCreate = {
                username: data.username,
                password: hashedPassword,
                role_id: data.role_id,
            };
            
            // Crear Access dentro de la transacción
            const newAccess = await Access.create(accessDataToCreate as AccessesAttributes, { transaction: t });
            
            // 2. Preparar y crear el registro de User, vinculándolo al ID de Access
            const userDataToCreate: UsersAttributes = {
                document_type_id: data.document_type_id, 
                fullname: data.fullname, 
                document_number: data.document_number, 
                email: data.email, 
                is_active: data.is_active ?? true, 
                access_id: newAccess.id_access,
            } as UsersAttributes;

            // Crear User dentro de la transacción
            const newUser = await User.create(userDataToCreate, { transaction: t });

            // 3. Devolver los datos del User creado en formato DTO
            return toUserResponseDTO(newUser.get());
        });

        return result;
    }

    public static async getAllUsers(): Promise<UserResponseDTO[]> {
        const users = await User.findAll({
            attributes: ['id_user', 'access_id', 'document_type_id', 'fullname', 'document_number', 'email', 'is_active']
        });

        return users.map(user => toUserResponseDTO(user.get())); //
    }
    
    public static async getUserById(id_user: number): Promise<UserResponseDTO | null> {
        const user = await User.findByPk(id_user);
        if (!user) {
            return null;
        }
        return toUserResponseDTO(user.get());
    }

    public static async updateExistingUser(id_user: number, updateData: UpdateUserDTO): Promise<UserResponseDTO | null> {
        const [rowsAffected, [updatedUser]] = await User.update(updateData, {
            where: { id_user },
            returning: true,
        });
        if (rowsAffected === 0) {
            return null;
        }
        return toUserResponseDTO(updatedUser.get());
    }

    public static async deleteUser(id_user: number): Promise<boolean> {
        const [rowsAffected] = await User.update({ is_active: false }, {
            where: { id_user, is_active: true },
            returning: true,
        });
        return rowsAffected > 0;
    }
}

export default UserDAO;