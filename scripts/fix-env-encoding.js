import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, '../.env');

try {
    if (fs.existsSync(envPath)) {
        const buffer = fs.readFileSync(envPath);
        if (buffer.includes(0x00)) {
            console.log('Detected UTF-16LE .env file. Converting to UTF-8...');
            const content = buffer.toString('utf16le');
            fs.writeFileSync(envPath, content, 'utf8');
            console.log('Converted successfully.');
        } else {
            console.log('File is already UTF-8 (or close enough).');
        }
    }
} catch (error) {
    console.error('Error converting .env:', error.message);
}
