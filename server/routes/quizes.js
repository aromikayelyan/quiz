import { Router } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { configDotenv } from 'dotenv';
import Quiz from '../models/quiz.js'
import User from "../models/user.js";
import authmiddleware from '../middleweares/authmiddleware.js';
import adminmiddleweare from '../middleweares/adminmiddleweare.js';


configDotenv()



const router = Router()





router.get('/',  async (req, res) => {
    try {
        let quizs = await Quiz.findAll()

        quizs.forEach(element => {
            element.answers = JSON.parse(element.answers)
        });

        return res.status(200).json(quizs)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Server error' })
    }
})


router.get('/:id', async (req, res) => {
    try {
        const uid = req.params.id
        let quiz = await Quiz.findOne({where:{uid}})

        quiz.answers = JSON.parse(quiz.answers)
       

        return res.status(200).json(quiz)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Server error' })
    }
})


router.post('/answer/:id', authmiddleware, async (req, res) => {
    try {
        const data = req.user
        const answerId = req.body.answerId

        const quiz = await Quiz.findOne({ where: { uid: req.params.id } })
        quiz.answers = JSON.parse(quiz.answers)

        const result = quiz.answers.find((answer) => answer.id == answerId)

        const saveData = {
            quizId: req.params.id,
            userAnswer: result
        }

        const user = await User.findOne({ where: { uid: data.uid } })

        let quizes = []

        if (user.quizstory) {
            quizes = JSON.parse(user.quizstory)
        }
        const alreadyAnswered = quizes.some(q => q.quizId === req.params.id)
        if (alreadyAnswered) {
            return res.status(400).json({ message: 'You have already answered this quiz.' })
        }
        quizes.push(saveData)
        user.quizstory = JSON.stringify(quizes)
        await user.save()

        return res.send(user)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Server error', error })
    }
})



router.post('/', authmiddleware, async (req, res) => {
    try {
        const data = req.user

    
        let {answers} = req.body
        answers = JSON.stringify(answers)
        const quiz = await Quiz.create({
			uid: uuidv4(),
			title: req.body.title,
			images: req.body.images,
			answers,
			createruid: data.uid,
		})

        const user = await User.findOne({where:{uid:data.uid}})

        let userquizes = []

        if(user.quizzes){
            
            userquizes = JSON.parse(user.quizzes)
        }
        userquizes.push(quiz.uid)
        user.quizzes = JSON.stringify(userquizes)
        await user.save()


		return res.status(201).json(quiz)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Server error' })
    }
})



router.put('/:id', authmiddleware, async (req, res) => {
    try {
        const uid = req.params.id
        const quiz = await Quiz.findOne({ where: { uid } })

        if (quiz.createruid != req.user.uid) {
            return res.status(400).json({ message: 'net dostupa' })
        }

        if(req.body.answers){
            quiz.answers = JSON.stringify(req.body.answers)
        }

        if (req.body.title) quiz.title = req.body.title
        if (req.body.images) quiz.images = req.body.images

        await quiz.save()

        return res.status(200).json({ message: 'updated' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Server error' })
    }
})



router.delete('/:id', authmiddleware, async (req, res)=>{
    try {
        const user = req.user
        const uid = req.params.id
        const quiz = await Quiz.findOne({where:{uid}})

        console.log(user)
        if (quiz.createruid === user.uid || user.role == 'ADMIN') {
            await quiz.destroy()
            return res.status(201).json({ message: 'deleted' })
        }


        return res.status(204).json({ message: 'net dostupa' })

        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Server error' })
    }
})




export default router