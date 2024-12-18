import React, { useState } from "react";
import { AlchemyProvider, ethers } from "ethers";
import contractABI from "./abi/ResourceManager.json";

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

function App() {
  const [name, setResourceName] = useState("");
  const [resourceType, setResourceType] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");

  const addResource = async () => {
    try {
      // Alchemy provider directly instead of relying on MetaMask
      const provider = new AlchemyProvider("sepolia", import.meta.env.VITE_ALCHEMY_API_KEY);
      const signer = new ethers.Wallet(import.meta.env.VITE_PRIVATE_KEY, provider);

      // Connect to the smart contract
      const contract = new ethers.Contract(contractAddress, contractABI.abi, signer);

      setStatus("Adding resource to the blockchain...");
      const tx = await contract.addResource(name, resourceType, location);
      await tx.wait();

      setStatus("Resource added successfully!");
    } catch (error) {
      console.error("Error adding resource:", error);
      setStatus(`Error: ${error.message}`);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Resource Manager</h1>
      <div>
        <input
          type="text"
          placeholder="Resource Name"
          value={name}
          onChange={(e) => setResourceName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Resource Type"
          value={resourceType}
          onChange={(e) => setResourceType(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button onClick={addResource}>Add Resource</button>
      </div>
      <p>{status}</p>
    </div>
  );
}

export default App;
