import jwt from 'jsonwebtoken'
import { configDotenv } from 'dotenv';

configDotenv()

const secret = process.env.SECRET_KEY

export default function () {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }

        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(403).json({ message: "Пользователь не авторизован!" })
            }
            const { role } = jwt.verify(token, secret)
            if (role !== "ADMIN") {
                return res.status(403).json({ message: "Не разрешена!!!" })
            }

            next()
        } catch (error) {
            console.log(error)
            return res.status(403).json({ message: "Пользователь не авторизован!" })
        }
    }
}