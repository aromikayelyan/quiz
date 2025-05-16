import Sequelize from "sequelize"
import sequelize from "../utils/connect.js"


const quizshistory = sequelize.define('Quizhistory',
    {
        uid: {
            type: Sequelize.STRING,
            allowNull: true
        },
        answerId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        useruid: {
            type: Sequelize.STRING,
            allowNull: true
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        }

    })



export default quizshistory
