// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const [lawyer, payer, payee] = await hre.ethers.getSigners();
  const Escrow = await hre.ethers.getContractFactory("Escrow");
  const escrow = await Escrow.deploy(payer.address, payee.address, 500000000000);

  await escrow.deployed();
  await escrow.connect(payer).deposit({ value: 500000000000 });
  
  await escrow.connect(payee).WorkDone();
  const balanceofPayee = await hre.ethers.provider.getBalance(payee.address);

  await escrow.connect(lawyer).releaseFunds();

  const checkBalance = await escrow.checkBalance();
  const balanceofPayee1 = await hre.ethers.provider.getBalance(payee.address);
  console.log(
    `deployed to ${escrow.address},`,
    "balance of Payee :",
    checkBalance,
    balanceofPayee,
    balanceofPayee1
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
