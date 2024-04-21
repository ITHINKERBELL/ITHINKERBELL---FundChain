import { cookies } from './entry';
import { project_backend } from "../../../declarations/project_backend";
export const authenticateToken = async () => {
    try {
        const email = cookies.get('email') || "";
        const token = cookies.get('token') || "";

        const res = await project_backend.validateToken(token, email);
        return res === "Valid token";
    } catch (e) {
        console.log(e);
        return false;
    }
};
