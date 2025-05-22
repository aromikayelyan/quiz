import Sequelize from "sequelize"
import sequelize from "../utils/connect.js"


const quizshistory = sequelize.define('Quizhistory',
    {
        uid: {
            type: Sequelize.STRING,
            allowNull: false
        },
        answerId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        useruid: {
            type: Sequelize.STRING,
            allowNull: false
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        }

    })



export default quizshistory
