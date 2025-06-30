import { ethers, network, run } from "hardhat";

async function main() {
  // 1. Получаем кошелёк-деплойер
  const [deployer] = await ethers.getSigners();
  console.log("⛏️  Deploying with account:", deployer.address);
  console.log("🌐  Network:", network.name);

  // 2. Подготавливаем фабрику контракта (имя должно точно совпадать с .sol)
  const Factory = await ethers.getContractFactory("DigitalAssetMarketplace");

  // 3. Запускаем деплой
  const marketplace = await Factory.deploy(/* args, если они есть */);

  // 4. Ждём, пока контракт реально появится в сети
  console.log("⏳  Waiting for deployment to be mined...");
  await marketplace.waitForDeployment();

  // 5. Логируем результат
  console.log(`✅  NFTMarketplace deployed to: ${marketplace.target}`);

  // 6. (опционально) Верификация на Etherscan
  if (network.name !== "hardhat" && process.env.ETHERSCAN_API_KEY) {
    console.log("🔍  Verifying on Etherscan…");
    try {
      await run("verify:verify", {
        address: marketplace.target,
        constructorArguments: [], // если есть args — добавьте их сюда
      });
      console.log("✅  Verification successful");
    } catch (err: any) {
      console.warn("⚠️  Verification failed:", err.message);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.error("❌  Deployment error:", err);
    process.exit(1);
  });
