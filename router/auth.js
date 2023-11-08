/* 
[/router/auth.js] -> 과제부분

    회원가입
    router.post("/signup", ...) -> post로 json 으로 create 되었는지 만들어보기
    
    로그인
    router.post("/login", ...) -> username/password를 post로 보내 그런 사람이 있는지를 확인 
    -> JWT를 만들어내고, 만료 날짜가 주어짐

    JWT 확인
    router.get("/me", ...) -> 모든 페이지를 돌 때 먼저 한번씩 실행, //남겨놓기

*/
import express from "express";
import { body } from "express-validator";
import { validate } from "../middleware/validator.js";
import * as authController from "../controller/auth.js";
import { isAuth } from '../middleware/auth.js';
const  router = express.Router();

const validateCredential = [
    body("username")
        .trim()
        .notEmpty()
        .withMessage("username은 반드시 입력해야 합니다."),
    body("password")
        .trim()
        .isLength({min: 4})
        .withMessage("password는 반드시 4자 이상이어야 합니다."),
    validate
];

const validateSignup = [
    ...validateCredential,
    body("name").notEmpty().withMessage("name은 반드시 입력해야 합니다."),
    body("email").isEmail().withMessage("email 형식 확인"),
    body("url").isURL().withMessage("url 형식 확인")
        .optional({nullable: true, checkFalsy: true}),
    validate
];

// SIGNUP /auth/signup
router.post("/signup", validateSignup, authController.signup );


// LOGIN /auth/login
router.post("/login", validateCredential,authController.login );

// ME /auth/me
router.get("/me", isAuth, authController.me)
export default router;