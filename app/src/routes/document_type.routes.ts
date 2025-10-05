import { Router } from 'express';
import { DocumentTypeController } from '../controllers/document_type.controller';

const router = Router();

router.get('/', DocumentTypeController.getAllDocumentTypes);
router.get('/:id', DocumentTypeController.getDocumentTypeById);
router.post('/', DocumentTypeController.createDocumentType);
router.put('/:id', DocumentTypeController.updateDocumentType);
router.delete('/:id', DocumentTypeController.deleteDocumentType);

export default router;