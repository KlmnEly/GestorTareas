export interface CreateAccessDTO {
    username: string;
    password: string;
    role_id?: number; 
}

// DTO de Salida: No incluimos la contraseña
export interface AccessResponseDTO {
    id: number;
    username: string;
    roleId: number | null;
}

// DTO de Entrada para Actualización: Todos los campos son opcionales
export interface UpdateAccessDTO {
    username?: string;
    password?: string;
    role_id?: number;
}

export const toAccessResponseDTO = (access: { id_access: number, username: string, role_id: number}): AccessResponseDTO => {
    return {
        id: access.id_access,
        username: access.username,
        roleId: access.role_id
    };
};
