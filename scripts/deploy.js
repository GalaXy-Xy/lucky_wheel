const hre = require("hardhat");

async function main() {
  console.log("Deploying LuckyWheel contract...");

  const LuckyWheel = await hre.ethers.getContractFactory("LuckyWheel");
  const luckyWheel = await LuckyWheel.deploy();

  await luckyWheel.waitForDeployment();

  const address = await luckyWheel.getAddress();
  console.log("LuckyWheel deployed to:", address);

  // Verify the deployment
  if (hre.network.name !== "hardhat") {
    console.log("Waiting for block confirmations...");
    await luckyWheel.deploymentTransaction().wait(6);
    
    try {
      await hre.run("verify:verify", {
        address: address,
        constructorArguments: [],
      });
      console.log("Contract verified on Etherscan");
    } catch (error) {
      console.log("Verification failed:", error.message);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
