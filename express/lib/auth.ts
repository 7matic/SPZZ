import * as argon2 from 'argon2';
import { randomBytes } from 'crypto';

export async function hashPassword(password: string) {
    try {
        // Generate a random salt
        const salt = randomBytes(32);

        // Hash the password with the salt
        const hash = await argon2.hash(password, { salt });

        return salt.toString('hex') + ':' + hash;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error;
    }
}

export async function verifyPassword(password: string, stored: string) {
    try {
        // Split the stored value into the salt and hash
        const [storedSalt, storedHash] = stored.split(':');

        // Convert the stored salt back into a Buffer
        const salt = Buffer.from(storedSalt, 'hex');

        // Verify the password using the stored hash and salt
        const isValid = await argon2.verify(storedHash, password, { salt });

        return isValid;
    } catch (error) {
        console.error('Error verifying password:', error);
        throw error;
    }
}