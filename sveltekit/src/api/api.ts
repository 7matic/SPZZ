const BACKEND_URL = import.meta.env.VITE_BACKEND_URL_FROM_SERVER as string;

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

export async function makeRequest(route: string, method: Method, body?: any) {
    try {
        const response = await fetch(`${BACKEND_URL}${route}`, {
            method,
            headers: {
                'Authorization': `${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            const data = await response.json();
            if (data.error === 'Token verification failed') {
                localStorage.removeItem('token');
                // Redirect the user to the login page
                window.location.href = '/login';
            }
            throw new Error(data.error);
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

