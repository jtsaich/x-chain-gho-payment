import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { WagmiConfig, createConfig, sepolia } from "wagmi";
import { localhost } from "wagmi/chains";
import { siweClient } from "@/utils/siweClient";

import { ConnectKitProvider, SIWESession, getDefaultConfig } from "connectkit";
import Layout from "@/components/Layout";

const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_ID!, // or infuraId
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,

    // Required
    appName: "GHO Trade NFTs",

    // Optional
    appDescription: "Your App Description",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)

    chains: [sepolia, localhost],
  })
);

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <WagmiConfig config={config}>
      <siweClient.Provider
        // Optional parameters
        enabled={true} // defaults true
        nonceRefetchInterval={300000} // in milliseconds, defaults to 5 minutes
        sessionRefetchInterval={300000} // in milliseconds, defaults to 5 minutes
        signOutOnDisconnect={true} // defaults true
        signOutOnAccountChange={true} // defaults true
        signOutOnNetworkChange={true} // defaults true
        // onSignIn={(session?: SIWESession) => void}
        // onSignOut={() => void}
      >
        <ConnectKitProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ConnectKitProvider>
      </siweClient.Provider>
    </WagmiConfig>
  );
};

export default App;
