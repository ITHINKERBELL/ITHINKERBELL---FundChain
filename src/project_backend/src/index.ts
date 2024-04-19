import { Canister, query, Record, text, Opt, Vec, int, StableBTreeMap, Principal, update, nat } from 'azle';
import { checkEmailValidity, checkEveryInputForSignup } from './util/checkValidation';
import { v4 as uuid } from 'uuid';
import { getUserByEmail } from './util/getUserByEmail';
import { compareHash, hash } from './util/hash';
import { encrypt, validate } from './util/authentication';

// Define the User record type
const User = Record({
    id: Principal,
    email: text,
    username: text,
    password: text,
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
export let users = StableBTreeMap<Principal, User>(0)

const Campaigns = Record({
    campaignId: text,
    title: text,
    owner: text,
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
type Campaigns = typeof Campaigns.tsType;

// new map testing
let campaigns = StableBTreeMap<CampaignId, Campaigns>(3);


export default Canister({

    greet: query([text], text, (name) => {
        return `Hello, ${name}!`;
    }),
    userRegistration: update([text, text, text, text, text, text, text, text], text, async (email, username, password, userType, firstName, lastName, middleName, birthday) => {
        // Checks whether the user's entered username, email, and password are valid and available
        const checkerForInput = await checkEveryInputForSignup(username, email, password, userType, birthday);
        if (checkerForInput.message === "success") {
            const id = generateId();
            // Bcrypt is used to encrypt the entered password
            const newUser: User = {
                id,
                email,
                username,
                password: hash(password, `${id}`),
                userType,
                name: {
                    firstName,
                    lastName,
                    middleName,
                    birthday
                },
                latestLoginDate: JSON.stringify(new Date())
            };
            users.insert(newUser.id, newUser)
        }
        return checkerForInput.message
    }),
    getAllUsers: query([], Vec(User), () => {
        return users.values()
    }),
    getUserByEmail: query([text], text, (email) => {
        {
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
        }
    }),
    userLogin: update([text, text], text, async (email, password) => {
        if (!checkEmailValidity(email)) {
            return 'Invalid email address.'
        }
        let allUsers = users.values();
        for (let user of allUsers) {
            {
                if (user.email.toLowerCase() === email.toLowerCase()) {
                    {
                        if (compareHash(password, user.password, `${user.id}`)) {
                            return await encrypt(user)
                        }
                        return `Incorrect email or password.`
                    }
                }
            }
        }
        return 'Incorrect email or password.'
    }),
    validateToken: query([text, text], text, (token: string, email: string) => {
        let user = getUserByEmail(email)
        if (!user) {
            return "Invalid token"
        }
        return validate(token, user) ? "Valid token" : `Invalid token ${hash(`Logged in ${user.latestLoginDate}`, JSON.stringify(user))} ${token}`
    }),
    createACampaign: update([text, text, text, text, text, text], Campaigns, async (_owner: string, _title: string, _description: string, _target: text, _deadline: text, _image: string) => {
        const deadlineTimestamp = Date.parse(_deadline);
        if (isNaN(deadlineTimestamp)) {
            throw new Error("Invalid deadline format");
        }

        if (deadlineTimestamp <= Date.now()) {
            throw new Error("The deadline should be a date in the future.");
        }

        let campaignId = uuid();

        const newCampaign: Campaigns = {
            campaignId: campaignId,
            title: _title,
            owner: _owner,
            description: _description,
            target: _target,
            deadline: _deadline,
            amountCollected: BigInt(0),
            image: _image,
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

    // getCampaignByTitle: query([CampaignTitle], Opt(Campaigns), (_campaignTitle: CampaignTitle) => {
    //     return campaigns.get(_campaignTitle);
    // }),

})

function generateId(): Principal {
    const randomBytes = new Array(29)
        .fill(0)
        .map((_) => Math.floor(Math.random() * 256));

    return Principal.fromUint8Array(Uint8Array.from(randomBytes));
}