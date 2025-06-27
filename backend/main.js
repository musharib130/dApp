const express = require("express");
const { ethers } = require("ethers");
const cors = require("cors");
const morgan = require("morgan");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(morgan("dev"));

const privateKey = process.env.PRIVATE_KEY;
const privateTwo = process.env.PRIVATE_TWO;

const provider = new ethers.JsonRpcProvider(process.env.INFURA_URL);

const wallet = new ethers.Wallet(privateTwo, provider);
const contractAddress = "0xD2f4C11b284cc45CAbB3542Cf5349091DA995806"; // Replace with deployed address
const abi = [
  "function getMessage() public view returns (string memory)",
  "function setMessage(string memory _newMessage) public",
  "function transferOwnership(address _newOwner) public",
  "function getOwner() public view returns (address)",
];

const contract = new ethers.Contract(contractAddress, abi, wallet);

app.get("/message", async (req, res) => {
  const message = await contract.getMessage();
  res.json({ message });
});

app.post("/message", async (req, res) => {
  const { newMessage } = req.body;

  try {
    const tx = await contract.setMessage(newMessage);
    await tx.wait();
  } catch(err) {
    return res.status(400).json({ error: err.message });
  }

  res.json({ success: true });
});

app.get("/owner", async (req, res) => {
  const owner = await contract.getOwner();
  res.json({ owner });
});

app.post("/transfer-ownership", async (req, res) => {
  const { newOwner } = req.body;
  const tx = await contract.transferOwnership(newOwner);
  await tx.wait();
  res.json({ success: true });
});

// Global error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Internal server error",
    message: err.message
  });
});


app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});