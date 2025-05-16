import { Router } from 'express'
import { v4 as uuidv4 } from 'uuid'
import Quiz from '../models/quiz.js'
import User from "../models/user.js";
import bcrypt from 'bcrypt'
import { configDotenv } from 'dotenv';
import { validationResult } from "express-validator"
import { checkData, generateAccessToken } from '../utils/utils.js';
import authmiddleware from '../middleweares/authmiddleware.js';
import adminmiddleweare from '../middleweares/adminmiddleweare.js';

configDotenv()


const router = Router()


router.post('/reg', checkData, async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json(errors)
        }
        const { username, password } = req.body
        const candidate = await User.findOne({ where: { username } })
        if (candidate) {
            return res.status(400).json({ message: "Пользователь с таким ником уже есть!" })
        }

        const hashPass = bcrypt.hashSync(password, 7)
        const user = await User.create({
            uid: uuidv4(),
            username,
            password: hashPass,
        })


        return res.json({ message: "Пользователь удачно зарегистрирован" })
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Ошибка регистрации" })
    }
})


router.post('/log', async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({where:{ username }})
        if (!user) {
            return res.status(400).json({ message: "Пользователь не найден!" })
        }
        const validPassword = bcrypt.compareSync(password, user.password)
        if (!validPassword) {
            return res.status(400).json({ message: "Введен неправильный пароль!" })
        }

        const token = generateAccessToken(user.uid, user.role)
        return res.json({token})
    } catch (error) {
        console.log(error)
    }
})


router.get('/getusers', adminmiddleweare(), async (req, res) => {
    try {
        const users = await User.findAll()


        return res.json(users)
    } catch (error) {
        console.log(error)
    }
})





export default router
