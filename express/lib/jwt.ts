import { Response, NextFunction } from 'express';
import { sign, decode, verify } from 'jsonwebtoken';
import { IGetUserAuthInfoRequest } from './types';

export function generateAccessToken(user_id: number, role: string, company_id?: number) {
    return sign({
        id: user_id,
        role: role,
        company_id: company_id
    }, process.env.JWT_SECRET as string, { expiresIn: '15m' });
}

// TODO: Non blocking middleware

export function verifyAccessToken(req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) {
    const token = req.headers['authorization'];

    if (!token) {
        console.log('Token is missing or undefined');
        return res.status(400).json({ error: 'Token missing or undefined' });
    }

    verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {
        if (err) {
            console.error(err);
            return res.status(403).json({ error: 'Token verification failed' });
        }
        req.user = user;
        next();
    });
}

export function generateRefreshToken(user_id: string) {
    return sign({
        user_id: user_id,
    }, process.env.JWT_REFRESH_TOKEN as string, { expiresIn: '7d' });
}