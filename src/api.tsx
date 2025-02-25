import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/auth/";

export const login = async (username: string, password: string) => {
    const response = await axios.post(`${API_URL}login/`, { username, password });
    if (response.data.access) {
        localStorage.setItem("token", response.data.access);
    }
    return response.data;
};

export const logout = () => {
    localStorage.removeItem("token");
};
