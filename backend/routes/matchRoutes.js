import express from "express";
import Match from "../models/Match.js";

const router = express.Router();

// SAVE MATCH
router.post("/", async (req, res) => {
  try {
    const newmatch = new Match(req.body);
    await newmatch.save();
    res.status(201).json(newmatch);
  }
  catch(err){
    res.status(500).json({ message: err.message });
  }
});

// GET MATCH HISTORY
router.get("/", async (req, res) => {
  try {
    const matches = await Match.find().sort({ createdAt: -1 });
    res.json(matches);
  }
  catch(err){
    res.status(500).json({ message: err.message });
  }
});

export default router;