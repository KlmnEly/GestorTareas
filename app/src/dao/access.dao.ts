import Access from '../models/accesses.model'; // RUTA VERIFICADA: Usamos 'accesses.model'
import { CreateAccessDTO, UpdateAccessDTO, AccessResponseDTO, toAccessResponseDTO } from '../dto/access.dto'; 
import { AccessesAttributes } from '../models/accesses.model';
import bcrypt from 'bcrypt';

class AccessDAO {

    public static async getAllAccesses(): Promise<AccessResponseDTO[]> {
        const accesses = await Access.findAll({
            attributes: ['id_access', 'username', 'role_id']
        });

        return accesses.map(access => toAccessResponseDTO(access.get()));
    }

    public static async getAccessById(id_access: number): Promise<AccessResponseDTO | null> {
        const access = await Access.findByPk(id_access);
        if (!access) {
            return null;
        }
        return toAccessResponseDTO(access.get());
    }

    public static async createAccess(accessData: CreateAccessDTO): Promise<AccessResponseDTO> {
        const hashedPassword = await bcrypt.hash(accessData.password, 10);
        const newAccess = await Access.create({
            ...accessData,
            password: hashedPassword
        } as AccessesAttributes);
        return toAccessResponseDTO(newAccess.get());
    }

    public static async updateAccess(id_access: number, updateData: UpdateAccessDTO): Promise<AccessResponseDTO | null> {
        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }
        const [rowsAffected, [updatedAccess]] = await Access.update(updateData, {
            where: { id_access },
            returning: true,
        });
        if (rowsAffected === 0) {
            return null;
        }
        return toAccessResponseDTO(updatedAccess.get());
    }

    public static async deleteAccess(id_access: number): Promise<boolean> {
        const rowsDeleted = await Access.destroy({
            where: { id_access }
        });
        return rowsDeleted > 0;
    }

}

export default AccessDAO;
