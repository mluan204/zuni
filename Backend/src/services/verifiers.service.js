const Holder = require("../models/holders.model");
const submitted_proof = require("../models/submitted_proof");
const Submitted_proof = require("../models/submitted_proof");
const Verifier = require("../models/verifiers.model");
const { ethers } = require("ethers");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const { ObjectId } = require("mongodb");

const verificationABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_registryDID",
        type: "address",
      },
      {
        internalType: "address",
        name: "_verifier",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "issuerDID",
        type: "string",
      },
      {
        internalType: "bytes",
        name: "proofs",
        type: "bytes",
      },
      {
        internalType: "bytes32",
        name: "major",
        type: "bytes32",
      },
    ],
    name: "verifyOnEd25519",
    outputs: [
      {
        internalType: "bool",
        name: "result",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(
  process.env.VERIFICATIONCENTER_ADDRESS,
  verificationABI,
  wallet
);

// Lấy thông tin Verifier
const getVerifierProfile = async (verifier_id) => {
  const verifier = await Verifier.findOne({ verifier_id }).select(
    "-hashed_password -encrypted_private_key"
  );
  if (!verifier) {
    throw new Error("Verifier not found");
  }
  return verifier;
};

const checkVerifier = async (verifier_did) => {
  const verifier = await Verifier.findOne({ DID: verifier_did });
  if (!verifier) {
    return false;
  }
  return true;
};

const getAllSummittedProofs = async (verifier_did) => {
  const submitted_proofs = await Submitted_proof.find({
    verifier_did: verifier_did,
  });

  const enriched_proofs = await Promise.all(
    submitted_proofs.map(async (proof) => {
      const holder = await Holder.findOne({ DID: proof.holder_did });

      return {
        ...proof.toObject(),
        holder_name: holder ? holder.name : "Không rõ",
      };
    })
  );

  return enriched_proofs;
};

const verifyProof = async (id, issuerDID, proof, major) => {
  try {
    const result = await contract.verifyOnEd25519(issuerDID, proof, major);
    if (result === true) {
      await submitted_proof.updateOne(
        { _id: new ObjectId(id) },
        { $set: { is_verified: true, updated_at: Date.now() } }
      );
    }
    return result;
  } catch (err) {
    console.error("Error verifying proof:", err);
    throw err;
  }
};

module.exports = {
  getVerifierProfile,
  checkVerifier,
  getAllSummittedProofs,
  verifyProof,
};
