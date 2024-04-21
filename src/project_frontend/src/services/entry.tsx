import Cookies from 'universal-cookie';
import { project_backend } from "../../../declarations/project_backend";

export const cookies = new Cookies();

export const login = async (email: string, password: string) => {
    try {
        const res = await project_backend.userLogin(email, password)
        return JSON.parse(res);
    } catch {
        return "Internal Server Error";
    }
};

export const logout = async () => {
    cookies.remove('token');
    cookies.remove('userType');
    cookies.remove('userFullName');
    cookies.remove('username');
    cookies.remove('email');
    cookies.remove('id');
};
