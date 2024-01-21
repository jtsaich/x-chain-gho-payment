import { defineConfig } from "@wagmi/cli";
import { react } from "@wagmi/cli/plugins";
import { Abi } from "viem";

import TradeWithERC20Token from "@/artifacts/contracts/TradeWithERC20Token.sol/TradeWithERC20Token.json";
import ERC721_Factory from "@/artifacts/contracts/ERC721Factory.sol/ERC721_Factory.json";
import ERC721 from "@/artifacts/contracts/ERC721.sol/ERC721.json";
import { erc20ABI } from "wagmi";

export default defineConfig({
  out: "generated.ts",
  contracts: [
    {
      abi: TradeWithERC20Token.abi as Abi,
      name: "TradeWithERC20Token",
    },
    {
      abi: ERC721_Factory.abi as Abi,
      name: "ERC721_Factory",
    },
    {
      abi: ERC721.abi as Abi,
      name: "ERC721",
    },
    {
      abi: erc20ABI,
      name: "ERC20",
    }
  ],
  plugins: [react(), ],
});
