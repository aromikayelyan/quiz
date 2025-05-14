import  Sequelize  from "sequelize"
import sequelize from "../utils/connect.js"


const user = sequelize.define('User',
    {
        id: {
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            type: Sequelize.INTEGER
        },
        uid: {
            type: Sequelize.STRING,
            allowNull: true
        },
        username: {
            type: Sequelize.STRING,
            allowNull: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: true
        },
        quizstory: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        quizzes: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        role: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: 'USER'
        }
    })





export default user
