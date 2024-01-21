import React from "react";
import { ConnectKitButton } from "connectkit";
import Link from "next/link";
import Image from "next/Image";

const Header = () => {
  return (
    <header className="navbar p-4 w-full flex justify-end bg-base-300 ">
      <div className="flex-1">
        <Link href="/">
          <Image
            src="/gho-nft-fund.png"
            alt="GHO NFT Fund"
            width={64}
            height={64}
          />
        </Link>
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
