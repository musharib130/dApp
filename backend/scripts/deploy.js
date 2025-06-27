const hre = require("hardhat");

async function main() {
  const HelloWorld = await hre.ethers.getContractFactory("OwnerControlledHelloWorld");
  const helloWorld = await HelloWorld.deploy();
  await helloWorld.waitForDeployment();

  const address = await helloWorld.getAddress();

  console.log("OwnerControlledHelloWorld deployed to:", address);
}

main()
.catch((error) => {
  console.error(error);
  process.exitCode = 1;
});