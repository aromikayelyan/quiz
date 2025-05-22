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
            unique: true,
            allowNull: false
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        role: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: 'USER'
        }
    })





export default user
