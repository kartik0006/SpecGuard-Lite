import express from 'express';
import { analyzeCode } from '../controllers/auditController.js';

const router = express.Router();

// This creates the POST endpoint
router.post('/', analyzeCode);

export default router;