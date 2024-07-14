const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("VendingMachineV1", (m) => {
  const INITIAL_SODA_COUNT = 100; // You can adjust this initial value as needed

  // Deploy the upgradeable contract
  const vendingMachine = m.contractAt(
    "VendingMachineV1",
    m.getParameter("vendingMachineAddress"),
    {
      from: m.getParameter("deployerAddress"),
    }
  );

  return { vendingMachine };
});