const express = require("express");
const { ethers } = require("ethers");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const provider = new ethers.JsonRpcProvider(process.env.INFURA_URL);

const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contractAddress = "0xe98313D8a51Ed15Ba5Dc1360548Ea5d0ed3E4826"; // Replace with deployed address
const abi = [
  "function getMessage() public view returns (string memory)",
  "function setMessage(string memory _newMessage) public",
];

const contract = new ethers.Contract(contractAddress, abi, wallet);

app.get("/message", async (req, res) => {
  try {
    const message = await contract.getMessage();
    res.json({ message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/message", async (req, res) => {
  try {
    const { newMessage } = req.body;
    const tx = await contract.setMessage(newMessage);
    await tx.wait();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});