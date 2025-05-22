import Sequelize from "sequelize"
import sequelize from "../utils/connect.js"


const quiz = sequelize.define('Quiz',
    {
        id: {
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            type: Sequelize.INTEGER
        },
        uid: {
            type: Sequelize.STRING,
            unique:true,
            allowNull: false
        },
        title: {
            type: Sequelize.STRING,
            allowNull: true
        },
        images: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        answers: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        createruid: {
            type: Sequelize.STRING,
            allowNull: true
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        }

    })



export default quiz
