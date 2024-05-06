import { project_backend } from "../../../declarations/project_backend"

export async function convertIdToTitle(id: string) {
    try {
        const res = await project_backend.getCampaignById(id);
        return res[0]?.title;
    } catch (error) {
        console.error("Error retrieving campaign title:", error);
        return null;
    }
}