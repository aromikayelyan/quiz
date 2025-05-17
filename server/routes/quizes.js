import { Router } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { configDotenv } from 'dotenv';
import multer from 'multer'
import Quiz from '../models/quiz.js'
import path from 'path'
import User from "../models/user.js";
import quizshistory from '../models/quizhistory.js';
import authmiddleware from '../middleweares/authmiddleware.js';
import adminmiddleweare from '../middleweares/adminmiddleweare.js';
import { deleteImages } from '../utils/utils.js';


configDotenv()


const router = Router()



var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/')
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + path.extname(file.originalname))
	},
})



const upload = multer({ storage })


router.get('/',  async (req, res) => {
    try {
        let quizs = await Quiz.findAll()

        quizs.forEach(element => {
            element.answers = JSON.parse(element.answers)
        });

        if (!quizs) {
            return res.status(404).json({ message: 'Quizes not found' })
        }

        const quizess = quizs.map(quiz => {
			quiz.dataValues.images =  `${req.protocol}://${req.get('host')}/uploads/${quiz.dataValues.images}`
			return quiz.dataValues
		})

        return res.status(200).json(quizess)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Server error' })
    }
})




router.get('/myquizes', authmiddleware, async (req, res) => {
    try {
        const data = req.user
        const user = await User.findOne({ where: { uid: data.uid } })

        if (!user){
            return res.status(404).json({ message: 'user not found' })
        }

        const myQuizes = await Quiz.findAll({where:{createruid: data.uid}})

        if (!myQuizes) {
            return res.status(404).json({ message: 'You dont have quizes!' })
        }

        myQuizes.forEach(element => {
            element.answers = JSON.parse(element.answers)
        });

        const quizess = myQuizes.map(quiz => {
			quiz.dataValues.images =  `${req.protocol}://${req.get('host')}/uploads/${quiz.dataValues.images}`
			return quiz.dataValues
		})

        return res.status(200).json(quizess)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Server error' })
    }
})


router.get('/myhistory', authmiddleware, async (req, res) => {
    try {
        const data = req.user
        const user = await User.findOne({ where: { uid: data.uid } })

        if (!user){
            return res.status(404).json({ message: 'user not found' })
        }

        const quizes = await Quiz.findAll()

        if (!quizes) {
            return res.status(404).json({ message: 'You dont have quiz hostory' })
        }

        const quizMap = new Map()
        quizes.forEach(q => quizMap.set(q.uid, q))


        const historydata = []
        const myhistory = await quizshistory.findAll({where:{useruid: data.uid}})
        myhistory.forEach((el) => {
            const result = quizMap.get(el.uid)
            if (result) {
                result.images =  `${req.protocol}://${req.get('host')}/uploads/${result.images}`
                historydata.push({
                    result,
                    answerId: el.answerId
                })
            }
        })

        return res.status(200).json(historydata)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Server error' })
    }
})


router.get('/:id', async (req, res) => {
    try {
        const uid = req.params.id
        let quiz = await Quiz.findOne({where:{uid}})

        if(!quiz){
            return res.status(404).json({ message: 'Quiz not found' })
        }

        quiz.answers = JSON.parse(quiz.answers)

        quiz.images = `${req.protocol}://${req.get('host')}/uploads/${quiz.images}`
       
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

        const user = await User.findOne({ where: { uid: data.uid } })
        const quiz = await Quiz.findOne({ where: { uid: req.params.id } })


        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' })
        }
        if (!user){
            return res.status(404).json({ message: 'user not found' })
        }

        const alreadyAnswered = await quizshistory.findOne({where:{uid:quiz.uid, useruid: user.uid}})

        if (alreadyAnswered) {
            return res.status(400).json({ message: 'You have already answered this quiz.' })
        }

        quiz.answers = JSON.parse(quiz.answers)

        const result = quiz.answers.find((answer) => answer.id == answerId)

        const answer = await quizshistory.create({
             uid: req.params.id,
             answerId,
             useruid: user.uid
        })

        
        return res.status(200).json({ answer: result, savedHistory: answer })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Server error', error })
    }
})



router.post('/', authmiddleware, upload.array('images', 1), async (req, res) => {
    try {
        const data = req.user

        if (!data){
            return res.status(404).json({ message: 'user not found' })
        }

        if (!req.files || req.files.length !== 1) {
            return res.status(400).json({ message: 'Exactly one image is required.' })
        }

        const image = req.files[0].filename
        console.log(image)

        let {answers} = req.body
        answers = JSON.stringify(answers)

        const quiz = await Quiz.create({
			uid: uuidv4(),
			title: req.body.title,
			images: image,
			answers,
			createruid: data.uid,
		})

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

        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' })
        }
        if (quiz.createruid != req.user.uid) {
            return res.status(400).json({ message: 'net dostupa' })
        }
        if(req.body.answers){
            quiz.answers = JSON.stringify(req.body.answers)
        }
        if (req.body.title) quiz.title = req.body.title

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

        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' })
        }
        if (quiz.createruid === user.uid || user.role == 'ADMIN') {

            try {
                await deleteImages(quiz.images)
            } catch (error) {
                console.log('no such')
            }


            await quiz.destroy()
            return res.status(200).json({ message: 'deleted' })
        }

        return res.status(403).json({ message: 'net dostupa' })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Server error' })
    }
})



export default router