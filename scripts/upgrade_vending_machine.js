const { ethers, upgrades } = require("hardhat");

async function main() {
  const proxyAddress = '0xFf88105aE3212e68ed2DAb8655656cA6a2c23684';

  console.log("Upgrading VendingMachine...");

  const VendingMachineV2 = await ethers.getContractFactory("VendingMachineV2");
  const upgradedVendingMachine = await upgrades.upgradeProxy(proxyAddress, VendingMachineV2, { force: true });

  console.log("VendingMachine upgraded");

  const implementationAddress = await upgrades.erc1967.getImplementationAddress(proxyAddress);
  console.log("New implementation deployed to:", implementationAddress);

  // Verification code...
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });