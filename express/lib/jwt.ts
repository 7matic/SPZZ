import { Request, Response, NextFunction } from 'express';
import { sign, decode, verify } from 'jsonwebtoken';

export interface IGetUserAuthInfoRequest extends Request {
    user: string // or any other type
}

export function generateAccessToken(user_id: number, role: string, company_id?: number) {
    console.log(process.env.JWT_SECRET);
    return sign({
        id: user_id,
        role: role,
        company_id: company_id
    }, process.env.JWT_SECRET as string, { expiresIn: '15m' });
}

export function verifyAccessToken(req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.status(400);

    verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
        console.log(err)

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