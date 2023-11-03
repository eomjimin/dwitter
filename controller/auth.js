import * as authRepository from "../data/auth.js";

export async function createUser(req, res, next){
    const { id, username, password, name, email, url } = req.body;
    const user = await authRepository.create(id, username, password, name, email, url);
    res.status(201).json(user);
}

export async function signIn(req, res, next){
    const {username, password} = req.body;
    const user = await authRepository.signin(username, password);
    console.log(user);
    if(user){
        res.status(200).json(user);
    }
    else{
        res.status(404).json({message: "아이디/비밀번호를 확인해주세요."});
    }
}