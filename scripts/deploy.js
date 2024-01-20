const hre = require("hardhat");
const colors = require("colors");

async function main() {
  await hre.run("compile");

  console.log("Deloying...");
  console.log("");

  const SoulFactory = await hre.ethers.getContractFactory("SoulFactory");
  const soulFactory = await SoulFactory.deploy();

  await soulFactory.waitForDeployment();

  console.log("Deloyed contract address: ");
  console.log(
    "-".red,
    `SoulFactory -> ${colors.brightBlue(soulFactory.target)}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
