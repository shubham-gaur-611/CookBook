export const API_BASE_URL = 'http://localhost:3000';

export const endpoints:any = {
    register: `${API_BASE_URL}/auth/register`,
    login: `${API_BASE_URL}/auth/login`,
    create_receipe: `${API_BASE_URL}/create-receipe/create`,
    get_receipe: `${API_BASE_URL}/create-receipe/getreceipes`,
    receipe_id: (id: string) => `${API_BASE_URL}/create-receipe/${id}`,
    favorite_receipes: `${API_BASE_URL}/favorite-receipe/create`,
    unfavorite_receipes: (id: string,user:string) =>`${API_BASE_URL}/favorite-receipe/${id}/${user}`,
    get_favorite_receipes: (id: string) => `${API_BASE_URL}/favorite-receipe/${id}`,
};  