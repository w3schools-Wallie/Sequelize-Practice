const {DataTypes} = require('sequelize')
const {sequelize} = require('./conn')


const Category = sequelize.define('category', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    }
},
    {
        timestamps: false, //This is added to skip createdAt and updatedAt checks. 
        //You can modify your database table to add these rows as needed.
    })

    module.exports = Category