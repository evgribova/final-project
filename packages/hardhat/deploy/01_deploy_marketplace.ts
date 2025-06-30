import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployYourContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  // Добавляем проверку аккаунта деплоера
  if (!deployer) {
    throw new Error("Deployer account not configured");
  }

  const deploymentResult = await deploy("DigitalAssetMarketplace", {
    from: deployer,
    args: [deployer],
    log: true,
    autoMine: true,
    // Добавляем подтверждение для живых сетей
    waitConfirmations: hre.network.name === "hardhat" ? 0 : 2,
  });

  // Проверяем успешность деплоя
  if (!deploymentResult.newlyDeployed) {
    console.log("Reusing existing contract at", deploymentResult.address);
    return;
  }
};

export default deployYourContract;

deployYourContract.tags = ["DigitalAssetMarketplace"];
