import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, '../.env');

try {
    if (!fs.existsSync(envPath)) {
        console.error('Error: .env file does not exist');
        process.exit(1);
    }

    const buffer = fs.readFileSync(envPath);
    console.log('File size:', buffer.length);
    console.log('First 20 bytes (hex):', buffer.subarray(0, 20).toString('hex'));

    // Check for BOM or null bytes indicating UTF-16
    const isUtf16 = buffer.includes(0x00);
    console.log('Contains null bytes (likely UTF-16):', isUtf16);

    let content = '';
    if (isUtf16) {
        console.log('Attempting to read as UTF-16LE...');
        content = buffer.toString('utf16le');
    } else {
        console.log('Reading as UTF-8...');
        content = buffer.toString('utf8');
    }

    console.log('Content preview:', content.substring(0, 50).replace(/\n/g, '\\n'));

    // Parse
    let supabaseUrl = '';
    let supabaseKey = '';

    const lines = content.split(/\r?\n/);
    for (const line of lines) {
        const match = line.match(/^\s*([\w_]+)\s*=\s*(.*)?\s*$/);
        if (match) {
            const key = match[1];
            let value = match[2] || '';
            if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
                value = value.slice(1, -1);
            }
            if (key === 'VITE_SUPABASE_URL') supabaseUrl = value;
            if (key === 'VITE_SUPABASE_ANON_KEY') supabaseKey = value;
        }
    }

    if (supabaseUrl && supabaseKey) {
        console.log('Successfully parsed keys!');
        console.log('URL:', supabaseUrl);
        const supabase = createClient(supabaseUrl, supabaseKey);
        const { data, error } = await supabase.from('test_sessions').select('count', { count: 'exact', head: true });
        if (error) {
            console.error('Connection failed:', error.message);
        } else {
            console.log('Connection successful!');
        }
    } else {
        console.error('Failed to find keys even after decoding.');
    }

} catch (error) {
    console.error('Error:', error.message);
}
