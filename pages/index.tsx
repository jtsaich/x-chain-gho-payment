import Image from "next/image";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

const Stages = dynamic(() => import("@/components/Stages"), {
  ssr: false,
});

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="App bg-background min-h-screen flex flex-row ">
      <Sidebar />
      <main
        className={`flex w-10/12 flex-col items-center justify-between ${inter.className}`}
      >
        <Header />
        <div>
          <Stages />
        </div>
      </main>
    </div>
  );
}
