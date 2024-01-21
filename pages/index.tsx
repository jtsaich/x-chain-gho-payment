import dynamic from "next/dynamic";
import { Inter } from "next/font/google";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import CreateNFTCollection from "@/components/CreateNFTCollection";
import NFTCollections from "@/components/NFTCollections";

const Stages = dynamic(() => import("@/components/Stages"), {
  ssr: false,
});

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="App bg-background min-h-screen flex flex-row ">
      <Sidebar />
      <main className={`flex w-10/12 flex-col items-center ${inter.className}`}>
        <Header />
        <div className="w-full">
          <Stages />
        </div>
        <div className="w-full px-4">
          <h2 className="text-3xl">Create Your NFT Collection</h2>
          <div className="w-full max-w-screen-sm">
            <CreateNFTCollection />
          </div>
        </div>
        <div className="w-full px-4">
          <h2 className="text-3xl">NFT Collections</h2>
          <NFTCollections />
        </div>
      </main>
    </div>
  );
}
