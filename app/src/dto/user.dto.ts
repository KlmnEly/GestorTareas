export interface CreateUserDTO {
    document_type_id: number;
    fullname: string;
    document_number: string;
    email: string;
    access_id?: number;
    is_active?: boolean;
}

export interface UpdateUserDTO {
    access_id?: number;
    document_type_id?: number;
    fullname?: string;
    document_number?: string;
    email?: string;
    is_active?: boolean;
}

export interface UserResponseDTO {
    id: number;
    accessId: number | null;
    documentTypeId: number;
    fullname: string;
    documentNumber: string;
    email: string;
    isActive: boolean;
}

export const toUserResponseDTO = (user: {
    id_user: number,
    access_id?: number,
    document_type_id: number,
    fullname: string,
    document_number: string,
    email: string,
    is_active: boolean
}): UserResponseDTO => {
    return {
        id: user.id_user,
        accessId: user.access_id || null,
        documentTypeId: user.document_type_id,
        fullname: user.fullname,
        documentNumber: user.document_number,
        email: user.email,
        isActive: user.is_active,
    };
};
