const { ethers, upgrades, run } = require("hardhat");

async function verifyContract(address, constructorArguments = []) {
  console.log(`Verifying contract at ${address}`);
  try {
    await run("verify:verify", {
      address: address,
      constructorArguments: constructorArguments,
    });
    console.log("Contract verified successfully");
  } catch (error) {
    if (error.message.toLowerCase().includes("already verified")) {
      console.log("Contract is already verified");
    } else {
      console.error("Error verifying contract:", error);
    }
  }
}

async function main() {
  const VendingMachineV1 = await ethers.getContractFactory("VendingMachineV1");
  console.log("Deploying VendingMachineV1...");
  
  const vendingMachine = await upgrades.deployProxy(VendingMachineV1, [100], { initializer: 'initialize' });
  await vendingMachine.waitForDeployment();
  
  const proxyAddress = await vendingMachine.getAddress();
  console.log("Proxy deployed to:", proxyAddress);

  const implementationAddress = await upgrades.erc1967.getImplementationAddress(proxyAddress);
  console.log("Implementation deployed to:", implementationAddress);

  // Wait for a few seconds to ensure the contracts are propagated on the network
  console.log("Waiting for contract propagation...");
  await new Promise(resolve => setTimeout(resolve, 30000)); // 30 seconds delay

  await verifyContract(implementationAddress);
  await verifyContract(proxyAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });