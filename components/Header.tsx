import React from "react";
import { ConnectKitButton, useChains } from "connectkit";
import { useSwitchNetwork } from "wagmi";
import Link from "next/link";

const Header = () => {
  return (
    <header className="navbar p-4 bg-base-100 w-full flex justify-end">
      <div className="flex-1">
        <Link href="/">X-Chain</Link>
      </div>
      <div className="flex-none">
        {/* <select onChange={(e) => switchNetwork(e.target.value)}>
          {chains.map((el) => (
            <option key={el.id} value={el.id}>
              {el.name}
            </option>
          ))}
        </select> */}
        <ConnectKitButton />
      </div>
    </header>
  );
};

export default Header;
