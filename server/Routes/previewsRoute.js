import express from 'express';
import {
  getPreviews,
  createPreview,
  updatePreview,
  deletePreview
} from "../Controllers/previewsController.js";

const router = express.Router();

router.get('/', getPreviews);
router.post('/', createPreview)
router.put('/:id', updatePreview)
router.delete('/:id',deletePreview)
export default router;
