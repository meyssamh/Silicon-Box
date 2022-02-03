import path from 'path';
import fs from 'fs';

/**
 * Gets data from data folder.
 * 
 * @param {string} filename - Name of the file, we want to use.
 * @returns {Array} - An array of objects.
 */
export default function getData(filename: string): any[] {
	const filePath: string = path.join(process.cwd(), 'data', filename);
	let jsonData: string = fs.readFileSync(filePath, 'utf8');
	const data: any[] = JSON.parse(jsonData);
	return data;
};