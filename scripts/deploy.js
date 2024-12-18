const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const CommunityResources = await ethers.getContractFactory("CommunityResources");
    const contract = await CommunityResources.deploy();

    console.log("Contract deployment transaction hash:", contract.deploymentTransaction().hash);

    await contract.waitForDeployment(); // New syntax for Ethers.js v6

    console.log("Contract deployed to:", await contract.getAddress());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Error:", error);
        process.exit(1);
    });
