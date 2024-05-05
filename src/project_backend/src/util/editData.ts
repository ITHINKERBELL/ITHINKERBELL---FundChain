import { Campaigns } from "..";

export const editCampaignDonations = async (campaigns: any, campaignId: string, donor: string, amount: number) => {
    try {
        const campaignOpt = campaigns.get(campaignId)
        const newCampaign: Campaigns = {
            campaignId: campaignId,
            title: campaignOpt.title,
            ownerName: campaignOpt.ownerName,
            ownerWallet: campaignOpt.ownerWallet,
            description: campaignOpt.description,
            target: campaignOpt.target,
            deadline: campaignOpt.deadline,
            amountCollected: campaignOpt.amountCollected + amount,
            image: campaignOpt.image,
            donators: campaignOpt.push(donor),
            donations: campaignOpt.push(amount)
        };
        campaigns.remove(campaignId);
        campaigns.insert(newCampaign.campaignId, newCampaign);
        return true;
    } catch {
        return false;
    }
}