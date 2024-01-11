import express from 'express';
import prisma from '../../lib/db';
import upload from '../../lib/storage';
import { uploadFile } from '../controllers/upload';

const uploadRouter = express.Router();

// Set up a route for file uploads
uploadRouter.post('/upload', upload.single('file'), async (req, res) => {
    // Handle the uploaded file

    const filename = req.file!.filename;

    await uploadFile(filename);

    return res.json({
        status: 200,
        message: 'File uploaded successfully, user successfully updated!'
    });
});

export { uploadRouter };