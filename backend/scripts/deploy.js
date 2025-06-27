const hre = require("hardhat");

async function main() {
  const HelloWorld = await hre.ethers.getContractFactory("HelloWorld");
  const helloWorld = await HelloWorld.deploy();
  await helloWorld.waitForDeployment();

  const address = await helloWorld.getAddress();

  console.log("HelloWorld deployed to:", address);
}

main()
.catch((error) => {
  console.error(error);
  process.exitCode = 1;
});