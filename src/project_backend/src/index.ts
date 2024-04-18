import { Canister, query, Record, text, Opt, Vec, int, StableBTreeMap, Principal, update, nat } from 'azle';
import { checkEmailValidity, checkEveryInputForSignup } from './util/checkValidation';
import { v4 as uuid } from 'uuid';

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
    })
})

type User = typeof User.tsType;
export let users = StableBTreeMap<Principal, User>(0)

const CampaignId = text;
const CampaignTitle = text;

// Define the Campaign record type
const Campaign_ = Record({
    // campaignId : text,
    title: text,
    owner: text,
    description: text,
    target: nat,
    deadline: nat,
    amountCollected: nat,
    image: text,
    donators: Vec(text),
    donations: Vec(int)
});

type CampaignId = typeof CampaignId.tsType;
type CampaignTitle = typeof CampaignTitle.tsType;
type Campaign_ = typeof Campaign_.tsType;


// let campaigns = StableBTreeMap<CampaignId, Campaign_>(0);   

let campaigns = StableBTreeMap<CampaignTitle, Campaign_>(0);   
let campaignCount = 0;

export default Canister({

    greet: query([text], text, (name) => {
        return `Hello, ${name}!`;
    }),

    userRegistration: update([text, text, text, text, text, text, text, text], text, async (email, username, password, userType, firstName, lastName, middleName, birthday) => {
        // Checks whether the user's entered username, email, and password are valid and available
        const checkerForInput = await checkEveryInputForSignup(username, email, password, userType, birthday);
        if(checkerForInput.message === "success"){
            const id = generateId();
            // Bcrypt is used to encrypt the entered password
            const newUser: User = {
                id,
                email,
                username,
                password,
                userType,
                name: {
                    firstName,
                    lastName,
                    middleName,
                    birthday
                }
            };
            users.insert(newUser.id, newUser)
        }
        return checkerForInput.message
    }),

    getAllUsers: query([], Vec(User), () => {
        return users.values()
    }), 

    getUserByEmail: query([text], text, (email) => {{
        let foundUser = null;
        let allUsers = users.values();
        for (let user of allUsers) {{
            if (user.email.toLowerCase() === email.toLowerCase()) {{
                foundUser = user;
                break;
            }}
        }}
        return JSON.stringify(foundUser);
    }}),

    userLogin: query([text, text], text, async (email, password)=> {
        if (!checkEmailValidity(email)) {
            return 'Invalid email address.'
        }
        let allUsers = users.values();
        for (let user of allUsers) {{
            if (user.email.toLowerCase() === email.toLowerCase()) {{
                // TODO: add bhash
                if(password === user.password){
                    return 'Successful login'
                }
                return 'Incorrect email or password.'
            }}
        }}
        return 'Incorrect email or password.'
    }),

    createACampaign: update([text, text, text, nat, nat, text], Campaign_, async (_owner: string, _title: string, _description: string, _target: nat, _deadline: nat, _image: string) => {
        if (_deadline <= Date.now()) {
            throw new Error("The deadline should be a date in the future.");
        }

        let campaignId = uuid();

        const newCampaign : Campaign_ = {
            // campaignId: campaignId,
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

        campaigns.insert(newCampaign.title, newCampaign);

        campaignCount++;
        return newCampaign;
    }),

    getAllCampaigns: query([], Vec(Campaign_), () => {
        return campaigns.values();
    }),

    getCampaignById: query([CampaignId], Opt(Campaign_), (_campaignId: CampaignId) => {
        return campaigns.get(_campaignId);
    }),

    getCampaignByTitle: query([CampaignTitle], Opt(Campaign_), (_campaignTitle: CampaignTitle) => {
        return campaigns.get(_campaignTitle);
    }),

})

function generateId(): Principal {
    const randomBytes = new Array(29)
        .fill(0)
        .map((_) => Math.floor(Math.random() * 256));

    return Principal.fromUint8Array(Uint8Array.from(randomBytes));
}