// import * as authRepository from "../data/auth.js";
// import jwt from "jsonwebtoken";
// import bcrypt from 'bcrypt';
// export async function createUser(req, res, next){
//     const { id, username, password, name, email, url } = req.body;
//     const user = await authRepository.create(id, username, password, name, email, url);
//     res.status(201).json(user);
// }

// export async function signIn(req, res, next){
//     const {username, password} = req.body;
//     const user = await authRepository.signin(username, password);
//     console.log(user);
//     if(user){
//         res.status(200).json(user);
//     }
//     else{
//         res.status(404).json({message: "아이디/비밀번호를 확인해주세요."});
//     }
// }
import * as userRepository from '../data/auth.js';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

// 설정파일로 적용할 예정
const jwtSecretKey = 'abcdef!@#$%^&*()';
const jwtExpiresInDays = '2d';
const bcryptSaltRounds = 12;

export async function signup(req, res){
    const {username, password, name, email, url} = req.body;
    const found = await userRepository.findByUsername(username);
    if (found){
        return res.status(409).json({message: `${username}이 이미 가입되었음`});
    }

    const hased = await bcrypt.hash(password, bcryptSaltRounds);
    const userId = await userRepository.createUser({
        username,
        password: hased,
        name,
        email,
        url
    });
    const token = createJwtToken(userId);
    res.status(201).json({token, username});
}

function createJwtToken(id){
    return jwt.sign({id}, jwtSecretKey, {expiresIn:jwtExpiresInDays});
}

export async function me(req, res, next){
    const user = await userRepository.findById(req.userId);
    if(!user){
        return res.status(404).json({message: '사용자를 찾을 수 없음'});
    }
    res.status(200).json({token: req.token, username: user.username});
}

export async function login(req, res) {
    const {username, password} = req.body;
    const user = await userRepository.findByUsername(username);
    if (!user){
        return res.status(404).json({message: '사용자를 찾을 수 없음'});
    }
    const result = bcrypt.compareSync(password, user.password);
    if(!result){
        return res.status(404).json({message: '비밀번호 오류'});
    }
    const token = createJwtToken(user.id);
    res.status(200).json({token, username: user.username});
}

