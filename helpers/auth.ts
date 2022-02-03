import { hash, compare } from 'bcryptjs';

/**
 * Hashes given password with the bryptjs.
 * 
 * @param {String} password - Users password.
 * @returns {Promise} - A hashed password.
 */
export async function hashPassword(password: string): Promise<string> {
	// Autogenerates a salt and hashes the password with that salt.
	const hashedPassword: string = await hash(password, 12);
	return hashedPassword;
};

/**
 * Verifys if the entered password and hashed password match.
 * 
 * @param {String} password - Entered password.
 * @param {String} hashedPassword - Users hashes password.
 * @returns {Promise} - A boolean to showing if the passwords match.
 */
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
	// Compares entered password with the hashed password and checks if they match.
	const isValid: boolean = await compare(password, hashedPassword);
	return isValid;
};