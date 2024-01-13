import express from 'express';
import upload from '../../lib/storage';
import { parseAndWrite } from '../controllers/upload';
import { verifyAccessToken } from '../../lib/jwt';
import { IGetUserAuthInfoRequest } from '../../lib/types';

const uploadRouter = express.Router();

uploadRouter.post('/parseFromStorage', verifyAccessToken, async (req : IGetUserAuthInfoRequest, res) => {
    if(!req.user) {
        return res.status(400).json({
            status: 400,
            message: 'No authorization!'
        });
    }

    const filename = req.body.filename;

    await parseAndWrite(req.user.id, filename);

    return res.json({
        status: 200,
        message: 'File uploaded successfully, user successfully updated!'
    });
});

// Set up a route for file uploads
uploadRouter.post('/upload', verifyAccessToken, upload.single('file'), async (req : IGetUserAuthInfoRequest, res) => {
    // Handle the uploaded file
    if(!req.file || !req.user) {
        return res.status(400).json({
            status: 400,
            message: 'No file or authorization!'
        });
    }

    const filename = req.file!.filename;

    await parseAndWrite(req.user.id, filename);
    
    return res.json({
        status: 200,
        message: 'File uploaded successfully, user successfully updated!'
    });
});

export { uploadRouter };