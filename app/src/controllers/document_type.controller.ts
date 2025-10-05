import { Request, Response } from 'express';
import DocumentTypeDAO from '../dao/document_type.dao';
import { CreateDocumentTypeDTO } from '../dto/document_type.dto';
import { ValidationError } from 'sequelize';

export class DocumentTypeController {
    public static async getAllDocumentTypes(req: Request, res: Response): Promise<void> {
        try {
            const documentTypes = await DocumentTypeDAO.getAllDocumentTypes();
            res.status(200).json(documentTypes);
        } catch (error) {
            console.error('Error al obtener tipos de documento:', error);
            res.status(500).json({ message: 'Error interno del servidor al obtener tipos de documento.' });
        }
    }

    public static async getDocumentTypeById(req: Request, res: Response): Promise<void> {
        const id_document_type = parseInt(req.params.id, 10);

        if (isNaN(id_document_type)) {
            res.status(400).json({ message: 'ID de tipo de documento inválido.' });
            return;
        }

        try {
            const documentType = await DocumentTypeDAO.getDocumentTypeById(id_document_type);

            if (documentType) {
                res.status(200).json(documentType);
            } else {
                res.status(404).json({ message: `Tipo de documento con ID ${id_document_type} no encontrado.` });
            }
        } catch (error) {
            console.error(`Error al obtener tipo de documento con ID ${id_document_type}:`, error);
            res.status(500).json({ message: 'Error interno del servidor.' });
        }
    }

    public static async createDocumentType(req: Request, res: Response): Promise<void> {
        const documentTypeData: CreateDocumentTypeDTO = req.body;

        if (!documentTypeData.name) {
            res.status(400).json({ message: 'El campo "name" es requerido.' });
            return;
        }

        try {
            const newDocumentType = await DocumentTypeDAO.createDocumentType(documentTypeData);
            res.status(201).json(newDocumentType);
        } catch (error) {
            if (error instanceof ValidationError) {
                res.status(400).json({ message: error.message });
            } else {
                console.error('Error al crear tipo de documento:', error);
                res.status(500).json({ message: 'Error interno del servidor al crear tipo de documento.' });
            }
        }
    }

    public static async updateDocumentType(req: Request, res: Response): Promise<void> {
        const id_document_type = parseInt(req.params.id, 10);
        const updateData: Partial<CreateDocumentTypeDTO> = req.body;

        if (isNaN(id_document_type)) {
            res.status(400).json({ message: 'ID de tipo de documento inválido.' });
            return;
        }

        try {
            const updatedDocumentType = await DocumentTypeDAO.updateDocumentType(id_document_type, updateData);
            if (updatedDocumentType) {
                res.status(200).json(updatedDocumentType);
            } else {
                res.status(404).json({ message: `Tipo de documento con ID ${id_document_type} no encontrado.` });
            }
        } catch (error) {
            if (error instanceof ValidationError) {
                res.status(400).json({ message: error.message });
            } else {
                console.error(`Error al actualizar tipo de documento con ID ${id_document_type}:`, error);
                res.status(500).json({ message: 'Error interno del servidor al actualizar tipo de documento.' });
            }
        }
    }

    public static async deleteDocumentType(req: Request, res: Response): Promise<void> {
        const id_document_type = parseInt(req.params.id, 10);

        if (isNaN(id_document_type)) {
            res.status(400).json({ message: 'ID de tipo de documento inválido.' });
            return;
        }

        try {
            const success = await DocumentTypeDAO.deleteDocumentType(id_document_type);

            if (success) {
                res.status(200).json({ message: `Tipo de documento con ID ${id_document_type} desactivado.` });
            } else {
                res.status(404).json({ message: `Tipo de documento con ID ${id_document_type} no encontrado o ya desactivado.` });
            }
        } catch (error) {
            console.error(`Error al desactivar tipo de documento con ID ${id_document_type}:`, error);
            res.status(500).json({ message: 'Error interno del servidor al desactivar tipo de documento.' });
        }
    }
}