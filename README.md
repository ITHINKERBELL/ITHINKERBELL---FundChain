# FundChain

In a world increasingly driven by connectivity and collaboration, FundChain emerges as a pioneering platform at the intersection of blockchain technology and crowdfunding. With the ethos of decentralization and transparency at its core, we can imagine the landscape of charitable giving and fundraising, harnessing the transformative potential of Web3.

Introducing FundChain, the world’s first Web3 crowdfunding application.
Here is an image of our architecture diagram to show you how everything works:
![440797391_838872561413418_3168399850845430773_n](https://github.com/ITHINKERBELL/ITHINKERBELL---FundChain/assets/146546927/3906ec49-784d-4c41-abef-8bfc82b3d35b)


To get started, you might want to explore the project directory structure and the default configuration file. Working with this project in your development environment will not affect any production deployment or identity tokens.

To learn more before you start working with our project, see the following documentation available online:

- [Quick Start](https://internetcomputer.org/docs/current/developer-docs/setup/deploy-locally)
- [SDK Developer Tools](https://internetcomputer.org/docs/current/developer-docs/setup/install)
- Here's a live preview of our app that is deployed to the ICP mainnet:[Live Preview](https://k4lg5-iiaaa-aaaag-qjurq-cai.icp0.io/)

## Step-by-step guide to our app (use the live preview link)
First, you'll be redirected to our Campaign Page where you'll see a wallet connect button at the top right:
![image](https://github.com/ITHINKERBELL/ITHINKERBELL---FundChain/assets/146546927/8b02380f-f24d-4c85-9ec0-ef2006c9e420)

Next, what you need to do is connect a wallet that is supported by our app:
![image](https://github.com/ITHINKERBELL/ITHINKERBELL---FundChain/assets/146546927/94d7f468-1513-4aae-8eb2-46f187a0a1e9)

For this example, we'll be using ![MetaMask](https://metamask.io/):
![image](https://github.com/ITHINKERBELL/ITHINKERBELL---FundChain/assets/146546927/32ed1f0b-b6ec-49e8-8bbb-0b781bc47aee)
Make sure you press the Browser tab at the right side if you're using your browser to connect.
Also make sure to create and account in MetaMask and download the extension for Chrome (assuming you're using Google Chrome as your browser), or else you'll see this.

If you're successful in making it as an extension, you should see it pop-up like this:
![image](https://github.com/ITHINKERBELL/ITHINKERBELL---FundChain/assets/146546927/5b6ed571-84e6-4670-a99e-a98ea57f8d73)

Before you do anything else, make sure you add the test network that we use which is ![BuildBear](https://faucet.buildbear.io/beautiful-magneto-aa453d68):
![image](https://github.com/ITHINKERBELL/ITHINKERBELL---FundChain/assets/146546927/3d515cdc-ad8d-477a-ac3b-55b271534522)
![image](https://github.com/ITHINKERBELL/ITHINKERBELL---FundChain/assets/146546927/215eed91-b351-4062-aed1-290ef5501d21)

A window will pop-up like this and you press Add a network manually:
![image](https://github.com/ITHINKERBELL/ITHINKERBELL---FundChain/assets/146546927/bf47ecb6-5cfd-47be-9a2c-830a131bf5af)

Add all the detail as follows:
Network Name: BuildBear
New RPC URL: https://rpc.buildbear.io/beautiful-magneto-aa453d68
Chain ID: 17142
Currency Symbol: Native Token
![image](https://github.com/ITHINKERBELL/ITHINKERBELL---FundChain/assets/146546927/2dd8dd7f-93db-4c58-84b3-a8ed62fc922e)

If you've successfully done everything then it should look like this:
![image](https://github.com/ITHINKERBELL/ITHINKERBELL---FundChain/assets/146546927/ff472258-dc49-4d7f-bce0-94fbf4d312ed)
Now, press Switch to BuildBear:
![image](https://github.com/ITHINKERBELL/ITHINKERBELL---FundChain/assets/146546927/e2caee60-ab60-46f9-863d-43e91923d9f8)

Assuming you don't have anything in your account yet, you can go to the ![BuildBear](https://faucet.buildbear.io/beautiful-magneto-aa453d68) Faucet and request some tokens.
Don't worry, we'll also be showing you how to do that here:
Click the BuildBear Faucet Link that we have and you'll be redirected to this page.
![image](https://github.com/ITHINKERBELL/ITHINKERBELL---FundChain/assets/146546927/c790f471-4cab-43b8-b400-a322cce26227)
Press the MetaMask Wallet extension on the top right of the toolbar and copy your wallet address.

After you've copied the wallet address, paste it inside like this:
![image](https://github.com/ITHINKERBELL/ITHINKERBELL---FundChain/assets/146546927/97b9a795-0ed3-4d5d-bc82-a07c6583b920)

Now what you're going to do is specify the amount of tokens that you want in the Native Sandbox Token container:
![image](https://github.com/ITHINKERBELL/ITHINKERBELL---FundChain/assets/146546927/7097d7b4-6173-4af9-9c09-2955de6131c2)
Pick any number that you want and press Get Native Token.

After that request is successful, you'll see a pop-up on the top right saying how much tokens you have:
![image](https://github.com/ITHINKERBELL/ITHINKERBELL---FundChain/assets/146546927/d86205e1-c7e6-499a-b8ad-fd843b1821dc)


Now we can finally go back to our connect wallet:
Press the connect wallet and connect to MetaMask.
Specify the account that you want to connect and press Next.
![image](https://github.com/ITHINKERBELL/ITHINKERBELL---FundChain/assets/146546927/d1794291-5c79-4de6-ae06-9f613ca7ed4b)

It will prompt another message asking you to connect to our app, so press Connect.
![image](https://github.com/ITHINKERBELL/ITHINKERBELL---FundChain/assets/146546927/402b463c-3bd4-4830-be0b-a9158b668fb7)

After pressing Connect, you'll be redirected to our Sign-in page where you'll pick whether to be a Trustee or a Donor.
Keep in mind that Trustees are the ones that create the campaign and they won't be able to donate to anyone.
Donors are the ones that fund the campaign and of course, they can't create their own campaign.

Now you can fill up the details and we'll continue with the following user types below:

## Donor
Now that you've registered as a Donor, this will be the screen that you're going to have:
![image](https://github.com/ITHINKERBELL/ITHINKERBELL---FundChain/assets/146546927/7388002a-2059-47ba-b815-1d915ea9f6fd)
On your left side, you'll see a sidebar to check the campaigns that are going on right now. 
The details are provided in what kind of campaign they are, their business name, the amount collected and their own username.

If you click on one of the campaigns, this will be the screen you see:
![image](https://github.com/ITHINKERBELL/ITHINKERBELL---FundChain/assets/146546927/f4081cee-aea5-43da-9c2f-981c92bd3131)

Scroll down below a bit and you'll see the Fund button, including the amount of donators the campaign has had:
![image](https://github.com/ITHINKERBELL/ITHINKERBELL---FundChain/assets/146546927/a4a459f7-3fb8-4b18-b8b3-cc05342f57e7)














## Prerequisites


  1. Install WSL or wsl.exe --install in command prompt with Administrative Rights
     The link is here just in case you want a detailed guide on how to do it: https://learn.microsoft.com/en-us/windows/wsl/install

  2. Install NVM in the wsl terminal:
    - curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
    - nvm install node
    - node --version
  3. Install DFX or sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)" in the wsl terminal. 
    - sudo apt-get install libudev-dev
    - sudo apt install pkg-config
    - sudo apt install libssl-dev
    - sudo apt-get update


## Running the project locally

If you want to test our app locally, you can use the following commands (make sure you're using the wsl terminal with this):

```bash
git clone <the link of our github repo>
cd <name of the folder>
npm i 
dfx start
dfx deploy project_backend (do this in another terminal since dfx start needs to run)
dfx generate 
dfx deploy
```

Once the job completes, your application will be available at `http://localhost:4943?canisterId={asset_canister_id}`.

## If you want to make changes with our application please follow the guide below:
If you have made changes to your backend canister, you can generate a new candid interface with

```bash
npm run generate
```

at any time. This is recommended before starting the frontend development server, and will be run automatically any time you run `dfx deploy`.

If you are making frontend changes, you can start a development server with

```bash
npm start
```

Which will start a server at `http://localhost:8080`, proxying API requests to the replica at port 4943.

### Note on frontend environment variables

If you are hosting frontend code somewhere without using DFX, you may need to make one of the following adjustments to ensure your project does not fetch the root key in production:

- set`DFX_NETWORK` to `ic` if you are using Webpack
- use your own preferred method to replace `process.env.DFX_NETWORK` in the autogenerated declarations
  - Setting `canisters -> {asset_canister_id} -> declarations -> env_override to a string` in `dfx.json` will replace `process.env.DFX_NETWORK` with the string in the autogenerated declarations
- Write your own `createActor` constructor

## Milestone 
- [x]Brainstorming
- [x]Figma UI/UX
- [x]React and Azle Integration
- [x]Decentralized Wallet Integration
- [x]Working Transactions
- [x]Transaction History
- [ ]Top Donors

## References
![Internet Computer](https://internetcomputer.org/)
https://wagmi.sh/
https://docs.walletconnect.com/
https://demergent-labs.github.io/azle/
