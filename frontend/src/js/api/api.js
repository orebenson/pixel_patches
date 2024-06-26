const BACKEND_URL = process.env.BACKEND_URL;

function debugLog(method, path, json) {
    console.log(`API DEBUG ${method} ${path} status: ${json.status} message: ${json.message}`);
    if (method === 'GET') console.log(`API DEBUG ${JSON.stringify(json.data)}`);
}

async function setUsername(headers) {
    if(!headers.username) return;
    await localStorage.setItem("username", headers.username);
}

async function handleRequest(method, path, data = {}) {
    try {
        const response = await fetch(`${BACKEND_URL}${path}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: method === 'GET' ? null : JSON.stringify({ ...data }),
            credentials: 'include'
        });

        const json = await response.json();
        if (!response.ok) throw new Error(json.message || 'Unknown error');
        
        // debugLog(method, path, json);
        setUsername(json.headers);

        return method === 'GET' ? json.data : 'success';
    } catch (error) {
        console.error(`API ${method} ${path} error:`, error);
        return 'error';
    }
}

export async function GET(path) {
    return await handleRequest('GET', path);
}

export async function POST(path, data = {}) {
    return await handleRequest('POST', path, data);
}

