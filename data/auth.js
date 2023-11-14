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
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

// let users = [

//     {
//         id: "1",
//         username: "apple",
//         password: "$2b$10$6NVVL4gEtPh684Ncn2sCRe/LPe0u4kRkhBYSoiLx4bTGW5gwQ58Dy",   //abcd1234
//         name: "김사과",
//         email: "apple@apple.com",
//         url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrYEhHx-OXQF1NqVRXPL8R50ggKje3hQTvIA&usqp=CAU"
//     }

// ];

// export async function create(id, username, password, name, email, url) {
//     const hpw = bcrypt.hashSync(password, 10);
//     const user = {
//         id,
//         username,
//         password: hpw,
//         name,
//         email,
//         url
//     };
//     users = [user, ...users];
//     return users;
// }

// export async function signin(username, password) {
//     const user = users.filter((user) => user.username === username);
//     const expiresIn = 1200;
//     let Element;
//     if (user) {
//         user.forEach(element => {
//             const result = bcrypt.compareSync(password, element.password);
//             if (result) {
//                 const token = jwt.sign(
//                     {
//                         username,
//                         isAdmin: false
//                     },
//                     password,
//                     { expiresIn }
//                 );
//                 Element = element
//                 console.log(Element);
//             }
//         });
//         Element.expiresIn = expiresIn;
//         return Element;
//     }
// }
/*
    회원가입
    router.post("/signup", ...) -> post로 json 으로 create 되었는지 만들어보기
    
    로그인
    router.post("/login", ...) -> username/password를 post로 보내 그런 사람이 있는지를 확인 
    -> JWT를 만들어내고, 만료 날짜가 주어짐

    JWT 확인
    router.get("/me", ...) -> 모든 페이지를 돌 때 먼저 한번씩 실행, //남겨놓기

*/ 
import bcrypt, { hashSync } from "bcrypt";
import SQ from 'sequelize';
import { sequelize } from "../db/database.js";
const DataTypes = SQ.DataTypes;

export const User = sequelize.define(
    'user',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        url: {
            type: DataTypes.TEXT,
        }
    },
    {timestamps: false}
)



export async function findByUsername(username) {
    return User.findOne({ where: {username}});
}

export async function findById (id) {
    return User.findByPk(id);
}

export async function createUser(user){
    return User.create(user).then((data) => data.dataValues.id);
}