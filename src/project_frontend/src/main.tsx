// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import './index.scss';
// import { BrowserRouter } from 'react-router-dom';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <BrowserRouter>
//     <App />
//     </BrowserRouter>
//   </React.StrictMode>,
// );

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';
import { BrowserRouter } from 'react-router-dom';
import { 
  createConfig, 
  webSocket 
} from 'wagmi'
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { WagmiProvider } from 'wagmi'
import { arbitrum, mainnet, polygon, xdc, sepolia } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react';

// 0. Setup queryClient
const queryClient = new QueryClient()

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = '7e5e567c58b68069a3e1a0758b38219a'

// 2. Create wagmiConfig
const metadata = {
  name: 'FundChain Web3Modal',
  description: 'Web3Modal for FundChain',
  url: 'https://k4lg5-iiaaa-aaaag-qjurq-cai.icp0.io/', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [mainnet, arbitrum, polygon, xdc] as const
const config = defaultWagmiConfig({
  chains: [mainnet, sepolia],
  projectId,
  metadata,
  // transports: {
  //   [mainnet.id]: webSocket('wss://eth-mainnet.g.alchemy.com/v2/...'), 
  //   [sepolia.id]: webSocket('wss://eth-sepolia.g.alchemy.com/v2/...'), 
  // },
})

// 3. Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
  themeMode: 'light'
});

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);