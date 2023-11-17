
/*
    회원가입
    router.post("/signup", ...) -> post로 json 으로 create 되었는지 만들어보기
    
    로그인
    router.post("/login", ...) -> username/password를 post로 보내 그런 사람이 있는지를 확인 
    -> JWT를 만들어내고, 만료 날짜가 주어짐

    JWT 확인
    router.get("/me", ...) -> 모든 페이지를 돌 때 먼저 한번씩 실행, //남겨놓기

*/ 
import Mongoose from "mongoose";
import { useVirtualId } from "../db/database.js";
const userSchema = new Mongoose.Schema({
    username: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    url: String
});
useVirtualId(userSchema);
const User = Mongoose.model('User', userSchema);
export async function findByUsername(username) {
    return User.findOne({ username });
}
export async function findById(id) {
    return User.findById(id);
}
export async function createUser(user) {
    return new User(user).save().then((data) => data.id);
}