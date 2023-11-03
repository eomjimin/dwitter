import express from "express";
import * as tweetController from "../controller/tweet.js";
import { body, param, validationResult } from "express-validator"
import { validate } from "../middleware/validator.js"; 
const router = express.Router();

// ? 로 받아오는건 query 문 -> {username: ":username"} 형태로 받아옴

/*
    POST, PUT 에 text에 빈 문자열을 없애고, 최소 3자이상 입력해야 저장되도록 API에 적용
*/
const validateTweet = [
    body('text').trim().isLength({min : 3}).withMessage("텍스트는 공백을 제외하고 3글자 이상 작성해 주세요."),
    validate
]
// GET / tweets
// GET / tweets?username=:username
router.get("/", tweetController.getTweets);

// GET / tweets/:id
router.get("/:id", tweetController.getTweet);

// POST / tweets
router.post("/", validateTweet, tweetController.createTweet);

// PUT / tweet/:id 
router.put("/:id", validateTweet, tweetController.updateTweet);


// DELETE / tweets/:id     
router.delete("/:id", tweetController.delteTweet)

export default router; 