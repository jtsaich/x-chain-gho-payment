import React from "react";
import { ConnectKitButton, useChains } from "connectkit";
import { useSwitchNetwork } from "wagmi";

const Header = () => {
  const chains = useChains();
  const { switchNetwork } = useSwitchNetwork();

  return (
    <header className="navbar p-4 bg-base-100 w-full flex justify-end">
      <div className="">
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
