// routes/uploadRoutes.js
import express from 'express';
import upload from '../utils/upload.js';

const router = express.Router();

// Single file upload
router.post('/single', upload.single('file'), (req, res) => {
  try {
    res.json({ message: 'File uploaded successfully!', file: req.file });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Multiple files upload
router.post('/multiple', upload.array('files', 5), (req, res) => {
  try {
    res.json({ message: 'Files uploaded successfully!', files: req.files });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
