import _SoulFactory from "@/artifacts/contracts/SoulFactory.sol/SoulFactory.json";
import _Soul from "@/artifacts/contracts/Soul.sol/Soul.json";
import { Address } from "viem";

export const SoulFactory = {
  address: "0xe4803D7F4333EcF2C92D9304Fdf2bb646f97e828" as Address,
  abi: _SoulFactory.abi,
};

export const Soul = {
  abi: _Soul.abi,
};

export const TradeWithERC20Token_ADDRESS = "0x6B3D8CB1810118aBa42003Fc7e4Ec7BC9D1f708e";
export const ERC721_ADDRESS = "0x963F66880128dddD439c4B0d053e094F8309dd90";
export const ERC721_Factory_ADDRESS = "0x412fDA54F593c5796ccFd1D24B861A3FC4B718CB";
export const GhoToken_ADDRESS = "0xc4bF5CbDaBE595361438F8c6a187bDc330539c60";
