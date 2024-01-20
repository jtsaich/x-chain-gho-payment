import { defineConfig } from "@wagmi/cli";
import { react } from "@wagmi/cli/plugins";
import { Abi } from "viem";

import TradeWithGhoToken from "@/artifacts/contracts/TradeWithGhoToken.sol/TradeWithGhoToken.json";
import ERC721_Factory from "@/artifacts/contracts/ERC721Factory.sol/ERC721_Factory.json";
import ERC721 from "@/artifacts/contracts/ERC721.sol/ERC721.json";

export default defineConfig({
  out: "generated.ts",
  contracts: [
    {
      abi: TradeWithGhoToken.abi as Abi,
      name: "TradeWithGhoToken",
    },
    {
      abi: ERC721_Factory.abi as Abi,
      name: "ERC721_Factory",
    },
    {
      abi: ERC721.abi as Abi,
      name: "ERC721",
    },
  ],
  plugins: [react()],
});
