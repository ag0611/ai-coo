import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
});

export const executeCommand = async (command) => {
    const response = await API.post('/api/execute', { command });
    return response.data;
};

export const getSession = async (sessionId) => {
    const response = await API.get(`/api/session/${sessionId}`);
    return response.data;
};

export const getPolicy = async () => {
    const response = await API.get('/api/policy');
    return response.data;
};

export const updatePolicy = async (policyData) => {
    const response = await API.post('/api/policy', policyData);
    return response.data;
};

export default API;