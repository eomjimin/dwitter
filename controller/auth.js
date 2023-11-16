import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import * as userRepository from "../data/auth.js";
import { token } from "morgan";
import { config } from "../config.js"


export async function signup(req, res) {
    const { username, password, name, email, url } = req.body;
    const found = await userRepository.findByUsername(username);
    if ( found ){
        return res.status(409).json({ message: `${username}이 이미 가입되어있습니다.`});
    }

    const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);
    const userId = await userRepository.createUser({
        username,
        password: hashed,
        name,
        email,
        url
    });
    const token = createJwtToken(userId);
    res.status(201).json({token, username});
}

function createJwtToken(id) {
    return jwt.sign({id}, config.jwt.secretKey, {expiresIn: config.jwt.expiresInSec});
}   

export async function me(req, res, next){
    const user = await userRepository.findById(req.userId);
    if(!user){
        return res.status(404).json({ message:"사용자를 찾을 수 없음"});
    }
    res.status(200).json({ token: req.token, username: user.username });
}

export async function login(req, res) {
    // body에서 username, password 받아오기
    const { username, password } = req.body;

    // username 있는지 확인하기 (없으면 401)
    const user = await userRepository.findByUsername(username);
    if (!user){
        return res.status(401).json({message: "사용자를 찾을 수 없음"});
    }
    // 있으면 비밀번호 비교하기 (틀리면 401)
    
    const isValidpassword = await bcrypt.compare(password, user.password);  // await 대신에 comparesSync 사용가능
    if (!isValidpassword){
        res.status(401).json({message: "비밀번호 에러!"});
    }

    // 맞으면 토큰 생성(200)
    const token = createJwtToken(user.id);
    res.status(200).json({ token, username });
}
