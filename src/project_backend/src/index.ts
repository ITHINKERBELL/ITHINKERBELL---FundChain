import { Canister, query, Record, text, Opt, Vec, int, StableBTreeMap, Principal, update, nat } from 'azle';

const CampaignId = text;

// Define the Campaign record type
const Campaign = Record({
    owner: text,
    title: text,
    description: text,
    target: nat,
    deadline: nat,
    amountCollected: nat,
    image: text,
    donators: Vec(text),
    donations: Vec(int)
});

type CampaignId = typeof CampaignId.tsType;
type Campaign = typeof Campaign.tsType;


let campaigns = StableBTreeMap<CampaignId, Campaign>(0);   
let campaignCount = 0;

export default Canister({
    greet: query([text], text, (name) => {
        return `Hello, ${name}!`;
    }),


    createCampaign: update([text, text, text, nat, nat, text], int, async (_owner: string, _title: string, _description: string, _target: nat, _deadline: nat, _image: string) => {
        // if (_deadline <= Date.now()) {
        //     throw new Error("The deadline should be a date in the future.");
        // }

        const newCampaign : Campaign = {
            owner: _owner,
            title: _title,
            description: _description,
            target: _target,
            deadline: _deadline,
            amountCollected: BigInt(0),
            image: _image,
            donators: [],
            donations: []
        };

        campaigns.insert(_owner, newCampaign);

        campaignCount++;
        return BigInt(campaignCount);
    }),

})
 