import jwt from 'jsonwebtoken'
import { check } from "express-validator";
import { configDotenv } from 'dotenv'


configDotenv()
const secret = process.env.SECRET_KEY





export function generateAccessToken(uid, role){
    const payload = {
        uid, role
    }

    return jwt.sign(payload, secret, {expiresIn: "24h"})
}





export const checkData = [check('username', 'имя пользователя не может быть пустым').notEmpty(),
                          check('password', 'пароль должен быть больше 4 и меньше 10 символов').isLength({min:4, max:10}),]

