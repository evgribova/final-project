import { ethers, network, run } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("⛏️  Deploying with account:", deployer.address);
  console.log("🌐  Network:", network.name);

  const Factory = await ethers.getContractFactory("DigitalAssetMarketplace");

  const instance = await Factory.deploy(/* args если есть */);
  await instance.deployed();

  console.log(`✅ DigitalAssetMarketplace deployed at: ${instance.address}`);

  // Опциональная верификация
  if (network.name !== "hardhat" && process.env.ETHERSCAN_API_KEY) {
    await run("verify:verify", {
      address: instance.address,
      constructorArguments: [], // или твои аргументы
    });
    console.log("✅ Verified on Etherscan");
  }
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
