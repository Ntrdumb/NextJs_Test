import path from 'path';
import { promises as fs } from 'fs';

export async function GET(request) {
    const jsonDirectory = path.join(process.cwd(), 'public', 'data');
    const filePath = path.join(jsonDirectory, 'database.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    return new Response(fileContents, {
        headers: { 'Content-Type': 'application/json' },
    });
}
