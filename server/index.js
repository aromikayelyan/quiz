import express from 'express'
import sequelize from './utils/connect.js'
import multer from 'multer'
import path from 'path'
// import user from './models/user.js'
// import quiz from './models/quiz.js'
import quizes from './routes/quizes.js'
import { fileURLToPath } from 'url'
// import { Quiz, User, QuizHistory } from './models/modelsconn.js'
import auth from './routes/auth.js'
import cors from 'cors'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const upload = multer({ dest: 'uploads/' })

const PORT = 8004
const app = express()

app.use('/uploads', (req, res, next) => {
	res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
	next();
}, express.static(path.join(__dirname, 'uploads')))

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/quizes', quizes)
app.use('/auth', auth)


// await Quiz.sync({force:true})
// await User.sync({force:true})
// await QuizHistory.sync({force:true})



async function start() {
    try {
        await sequelize.sync()
        app.listen(PORT, () => {
            console.log(`server run on port ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}


start()