import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { WagmiConfig, createConfig, mainnet } from "wagmi";
import { arbitrum, optimism, polygon, localhost } from "wagmi/chains";

import {
  ConnectKitProvider,
  ConnectKitButton,
  getDefaultConfig,
} from "connectkit";

const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    alchemyId: process.env.ALCHEMY_ID, // or infuraId
    walletConnectProjectId: process.env.WALLETCONNECT_PROJECT_ID,

    // Required
    appName: "Your App Name",

    // Optional
    appDescription: "Your App Description",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)

    chains: [mainnet, polygon, optimism, arbitrum, localhost],
  })
);

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider>
        <Component {...pageProps} />
      </ConnectKitProvider>
    </WagmiConfig>
  );
};

export default App;
