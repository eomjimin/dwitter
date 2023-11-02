import express from "express";
import * as tweetController from "../controller/tweet.js";

const router = express.Router();

// ? 로 받아오는건 query 문 -> {username: ":username"} 형태로 받아옴

// GET / tweets
// GET / tweets?username=:username
router.get("/", tweetController.getTweets);

// GET / tweets/:id
router.get("/:id", tweetController.getTweet);

// POST / tweets
router.post("/", tweetController.createTweet);

// PUT / tweet/:id 
router.put("/:id", tweetController.updateTweet);

// DELETE / tweets/:id     
router.delete("/:id", tweetController.delteTweet)

export default router; 