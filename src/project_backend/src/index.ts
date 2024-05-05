import { Canister, query, Record, text, Opt, Vec, int, StableBTreeMap, Principal, update, nat, ic, Result, int32 } from 'azle';
import { checkEmailValidity, checkEveryInputForSignup } from './util/checkValidation';
import { v4 as uuid } from 'uuid';
import { editCampaignDonations } from './util/editData';

// Define the User record type
const User = Record({
    email: text,
    username: text,
    wallet: text,
    userType: text,
    name: Record({
        firstName: text,
        lastName: text,
        middleName: text,
        birthday: text
    }),
    latestLoginDate: text
})

export type User = typeof User.tsType;
export let users = StableBTreeMap<text, User>(4)

const Campaigns = Record({
    campaignId: text,
    title: text,
    ownerName: text,
    ownerWallet: text,
    description: text,
    target: text,
    deadline: text,
    amountCollected: nat,
    image: text,
    donators: Vec(text),
    donations: Vec(int)
});

const CampaignId = text;
type CampaignId = typeof CampaignId.tsType;
export type Campaigns = typeof Campaigns.tsType;

// new map testing
let campaigns = StableBTreeMap<CampaignId, Campaigns>(3);

export default Canister({

    greet: query([text], text, (name) => {
        return `Hello, ${name}!`;
    }),
    userRegistration: update([text, text, text, text, text, text, text, text], text, async (wallet, email, username, userType, firstName, lastName, middleName, birthday) => {
        // Checks whether the user's entered username, email, and password are valid and available
        const checkerForInput = await checkEveryInputForSignup(username, email, userType, birthday);
        if (checkerForInput.message === "success") {
            const regUser: User = {
                wallet,
                email,
                username,
                userType,
                name: {
                    firstName,
                    lastName,
                    middleName,
                    birthday
                },
                latestLoginDate: JSON.stringify(new Date())
            };
            users.insert(regUser.wallet, regUser)
        }
        return checkerForInput.message
    }),
    getUserTypeByWalletAddress: query([text], text, (wallet) => {
        let foundUser = users.get(wallet);
        if (foundUser && foundUser.Some) {
            return foundUser.Some.userType;
        } else {
            return "User not found";
        }
    }),
    getUsernameByWalletAddress: query([text], text, (wallet) => {
        let foundUser = users.get(wallet);
        if (foundUser && foundUser.Some) {
            return foundUser.Some.username;
        } else {
            return "User not found";
        }
    }),
    getUserDetailsByWalletAddress: query([text], text, (wallet) => {
        let foundUser = users.get(wallet);
        if (foundUser && foundUser.Some) {
            return JSON.stringify(foundUser.Some);
        } else {
            return "User not found";
        }
    }),
    getAllUsers: query([], Vec(User), () => {
        return users.values()
    }),
    getUserByEmail: query([text], text, (email) => {
        let foundUser = null;
        let allUsers = users.values();
        for (let user of allUsers) {
            {
                if (user.email.toLowerCase() === email.toLowerCase()) {
                    {
                        foundUser = user;
                        break;
                    }
                }
            }
        }
        return JSON.stringify(foundUser);
    }),
    createACampaign: update([text, text, text, text, text, text, text], Campaigns, async (ownerName, ownerWallet, title, description, target, deadline, image) => {
        const deadlineTimestamp = Date.parse(deadline);
        if (isNaN(deadlineTimestamp)) {
            throw new Error("Invalid deadline format");
        }

        if (deadlineTimestamp <= Date.now()) {
            throw new Error("The deadline should be a date in the future.");
        }

        let campaignId = uuid();

        const newCampaign: Campaigns = {
            campaignId: campaignId,
            title,
            ownerName,
            ownerWallet,
            description,
            target,
            deadline,
            amountCollected: BigInt(0),
            image,
            donators: [],
            donations: []
        };

        campaigns.insert(newCampaign.campaignId, newCampaign);

        return newCampaign;
    }),
    // debugging 
    getCampaignsLength: update([], text, () => {
        const numCampaigns = campaigns.len();

        return `${numCampaigns} number of campaigns`;
    }),
    getAllCampaigns: query([], Vec(Campaigns), () => {
        return campaigns.values();
    }),
    getCampaignById: query([CampaignId], Opt(Campaigns), (_campaignId: CampaignId) => {
        return campaigns.get(_campaignId);
    }),
    updateCampaignOnDonation: update([text, text, int32], text, async (campaignId, userWallet, amount) => {
        return (await editCampaignDonations(campaigns, campaignId, userWallet, amount)) ? "success" : "failed";
    }),
    // getCampaignByTitle: query([CampaignTitle], Opt(Campaigns), (_campaignTitle: CampaignTitle) => {
    //     return campaigns.get(_campaignTitle);
    // }),
    // getMe: query([], Principal, () => {
    //     let currentPrincipal = ic.caller();

    //     // If user does not exist, return error.
    //     if (!users.containsKey(currentPrincipal)) {
    //         return currentPrincipal;
    //     }

    //     // Return the current user.
    //     const user = users.get(currentPrincipal);
    //     // return JSON.stringify(user); // Assuming you want to return the user as a JSON string
    //     return currentPrincipal;

    // }),
    // userChecker: query([Principal], text, async (principal) => {
    //     // If user does not exist, return error.
    //     if (!users.containsKey(principal)) {
    //         return "unregistered";
    //     } else if (users.containsKey(principal)) {
    //         const principall = principal.toString();
    //         return `registered: ${principall}`
    //     }

    //     // Return the current user.
    //     const user = users.get(principal);
    //     const userr = user.toString();
    //     // return JSON.stringify(user); // Assuming you want to return the user as a JSON string
    //     return userr;

    // }),
    // userDetails: query([Principal], text, async (principal: Principal) => {
    //     const user = users.get(principal);
    //     return JSON.stringify({ message: 'success', user: user });
    // })
})