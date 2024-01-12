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

export function verifyAccessToken(req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) {
    const token = req.headers['authorization'];

    if (token == undefined) return res.status(400);

    verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {
        if (err) return res.status(403);
        req.user = user;
        next();
    })
}

export function generateRefreshToken(user_id: string) {
    return sign({
        user_id: user_id,
    }, process.env.JWT_REFRESH_TOKEN as string, { expiresIn: '7d' });
}