import { BACKEND_URL } from '../utils/constants.js'

async function handleRequest(method, path, data = {}) {
    try {
        const response = await fetch(`${BACKEND_URL}${path}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: method === 'GET' ? null : JSON.stringify({ ...data })
        });

        const json = await response.json();
        
        if (!response.ok) {
            throw new Error(json.message || 'Unknown error');
        }
        console.log(`${method} ${path} status: ${json.status} message: ${json.message}`);

        return method === 'GET' ? json.data : 'success';

    } catch (error) {
        console.error(`${method} ${path} error:`, error);
        return 'error';
    }
}

export async function GET(path) {
    return await handleRequest('GET', path);
}

export async function POST(path, data = {}) {
    return await handleRequest('POST', path, data);
}

