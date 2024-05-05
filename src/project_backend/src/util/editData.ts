import { Campaigns, User, campaigns, users } from "..";

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
export const editUserDonationsHistory = async (wallet: string, campaignId: string, amount: string) => {
    try {
        const userOpt: any = users.get(wallet)
        const regUser: User = {
            wallet: wallet,
            email: userOpt.Some.email,
            username: userOpt.Some.username,
            userType: userOpt.Some.userType,
            name: {
                firstName: userOpt.Some.firstName,
                lastName: userOpt.Some.lastName,
                middleName: userOpt.Some.middleName,
                birthday: userOpt.Some.birthday
            },
            historyCampaigns: [...userOpt.Some.historyCampaigns, campaignId],
            historyAmount: [...userOpt.Some.historyAmount, amount]
        };
        users.remove(wallet);
        users.insert(regUser.wallet, regUser);
        return true;
    } catch (e) {
        return false;
    }
}