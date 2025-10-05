// DTO de Entrada: Lo que se espera del cliente al crear un nuevo tipo de documento
export interface CreateDocumentTypeDTO {
    name: string;
    is_active?: boolean; 
}

// DTO de Salida: Lo que se le devuelve al cliente después de una operación (respuesta limpia)
export interface DocumentTypeResponseDTO {
    id: number;
    name: string;
    isActive: boolean; 
}

/**
 * Función de mapeo para transformar un objeto Sequelize/Modelo a nuestro DTO de Salida.
 * Esto asegura que solo enviamos los campos que queremos.
 */
export const toDocumentTypeResponseDTO = (documentType: { id_document_type: number, name: string, is_active: boolean }): DocumentTypeResponseDTO => {
    return {
        id: documentType.id_document_type,
        name: documentType.name,
        isActive: documentType.is_active,
    };
};