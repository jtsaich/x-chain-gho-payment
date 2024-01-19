import Image from "next/image";
import { Inter } from "next/font/google";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="App bg-background min-h-screen flex flex-row ">
      <Sidebar />
      <main
        className={`flex w-10/12 flex-col items-center justify-between ${inter.className}`}
      >
        <Header />
      </main>
    </div>
  );
}
