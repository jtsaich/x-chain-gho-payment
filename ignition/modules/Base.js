const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("Base", (m) => {
  const erc721 = m.contract("ERC721", [true]);
  const soul = m.contract("Soul", ["Soulbound Token"]);
  const tradeWithGhoToken = m.contract("TradeWithGhoToken");

  const erc721Factory = m.contract("ERC721_Factory", [
    "0x963F66880128dddD439c4B0d053e094F8309dd90",
  ]);
  const soulFactory = m.contract("SoulFactory");
  return { erc721, soul, tradeWithGhoToken, erc721Factory, soulFactory };
});
