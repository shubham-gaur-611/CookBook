export const API_BASE_URL = 'http://localhost:3000';

export const endpoints = {
    register: `${API_BASE_URL}/auth/register`,
    login: `${API_BASE_URL}/auth/login`,
    create_receipe: `${API_BASE_URL}/create-receipe/create`,
    get_receipe: `${API_BASE_URL}/create-receipe/getreceipes`,
    receipe_id: (id: string) => `${API_BASE_URL}/create-receipe/${id}`
};  