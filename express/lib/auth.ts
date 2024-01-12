import * as argon2 from 'argon2';
import { randomBytes } from 'crypto';

export async function hashPassword(password: string) {
    try {
        // Generate a random salt
        const salt = randomBytes(32);

        // Hash the password with the salt
        const hash = await argon2.hash(password, { salt });

        return salt + ':' + hash;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error;
    }
}

export async function verifyPassword(password: string, hash: string, salt: Buffer) {
    try {
        // Verify the password using the stored hash and salt
        const isValid = await argon2.verify(hash, password, { salt });

        return isValid;
    } catch (error) {
        console.error('Error verifying password:', error);
        throw error;
    }
}