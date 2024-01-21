import dynamic from "next/dynamic";
import { Inter } from "next/font/google";

import CreateNFTCollection from "@/components/CreateNFTCollection";
import NFTCollections from "@/components/NFTCollections";

const Stages = dynamic(() => import("@/components/Stages"), {
  ssr: false,
});

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="App bg-background min-h-screen flex flex-row p-4">
      <main className={`flex w-10/12 flex-col items-center ${inter.className}`}>
        <Stages />
        <CreateNFTCollection />
        <NFTCollections />
      </main>
    </div>
  );
}
