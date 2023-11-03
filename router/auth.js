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
import * as authController from "../controller/auth.js";

const router = express.Router();

router.post('/signup', authController.createUser);
router.post('/login', authController.signIn);

export default router;