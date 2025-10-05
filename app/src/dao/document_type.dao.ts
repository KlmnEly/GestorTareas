import DocumentType from '../models/document_types.model'; 
import { CreateDocumentTypeDTO, DocumentTypeResponseDTO, toDocumentTypeResponseDTO } from '../dto/document_type.dto';
import { DocumentTypesAttributes } from '../models/document_types.model';

class DocumentTypeDAO {
    
    public static async getAllDocumentTypes(): Promise<DocumentTypeResponseDTO[]> {
        const document_types = await DocumentType.findAll({
            attributes: ['id_document_type', 'name', 'is_active'] 
        });
        
        return document_types.map(document_type => toDocumentTypeResponseDTO(document_type.get()));
    }

    public static async getDocumentTypeById(id_document_type: number): Promise<DocumentTypeResponseDTO | null> {
        const document_type = await DocumentType.findByPk(id_document_type);
        
        if (!document_type) {
            return null;
        }
        
        return toDocumentTypeResponseDTO(document_type.get());
    }

    public static async createDocumentType(documentTypeData: CreateDocumentTypeDTO): Promise<DocumentTypeResponseDTO> {
        const newDocumentType = await DocumentType.create(documentTypeData as DocumentTypesAttributes); 
        
        return toDocumentTypeResponseDTO(newDocumentType.get());
    }

    public static async updateDocumentType(
        id_document_type: number, 
        updateData: Partial<CreateDocumentTypeDTO>
    ): Promise<DocumentTypeResponseDTO | null> {
        const [rowsAffected, [updatedDocumentType]] = await DocumentType.update(updateData, {
            where: { id_document_type },
            returning: true, 
        });

        if (rowsAffected === 0) {
            return null;
        }
        
        return toDocumentTypeResponseDTO(updatedDocumentType.get());
    }

    public static async deleteDocumentType(id_document_type: number): Promise<boolean> {
        const [rowsAffected] = await DocumentType.update({ is_active: false }, {
            where: { id_document_type, is_active: true }
        });

        return rowsAffected > 0;
    }
}

export default DocumentTypeDAO;