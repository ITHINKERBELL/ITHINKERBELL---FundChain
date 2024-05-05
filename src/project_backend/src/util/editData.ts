import { Campaigns, campaigns } from "..";
import { Opt, Some, None } from 'azle';

export const editCampaignDonations = async (campaignId: string, donor: string, amount: string) => {
    try {
        const campaignOpt: any = campaigns.get(campaignId)
        const newCampaign: Campaigns = {
            campaignId: campaignId,
            title: campaignOpt.Some.title,
            ownerName: campaignOpt.Some.ownerName,
            ownerWallet: campaignOpt.Some.ownerWallet,
            description: campaignOpt.Some.description,
            target: campaignOpt.Some.target,
            deadline: campaignOpt.Some.deadline,
            amountCollected: `${parseInt(campaignOpt.Some.amountCollected) + parseInt(amount)}`,
            image: campaignOpt.Some.image,
            donators: [...campaignOpt.Some.donators, donor],
            donations: [...campaignOpt.Some.donations, amount]
        }
        campaigns.remove(campaignId);
        campaigns.insert(newCampaign.campaignId, newCampaign);
        return true;
    } catch (e) {
        return false;
    }
}