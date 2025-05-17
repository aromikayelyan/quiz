import jwt from 'jsonwebtoken'
import { check } from "express-validator";
import { configDotenv } from 'dotenv'
import path from 'path'
import fs from 'fs'


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



export async function deleteImages(name) {
    const uploadsPath = path.resolve('uploads/')
    const fullPath = path.join(uploadsPath, name)
    if (fs.existsSync(fullPath)) {
        fs.unlink(fullPath, err => {
            if (err) console.error('Error deleting file:', err);
        });
    }
}
