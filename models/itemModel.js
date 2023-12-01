const { DataTypes } = require('sequelize')
const { sequelize } = require('./conn');
const Category = require('./categoryModel');

const Item = sequelize.define("items", {
id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement: true,
},
name:{
    type:DataTypes.STRING,
    allowNull:false,
},
price:{
    type:DataTypes.DECIMAL(10,2),
    allowNull:false,
},
description:{
    type:DataTypes.TEXT,
    allowNull:false,
},
category_id:{
    type:DataTypes.INTEGER,
}
},
{
    timestamps:false,
});

Item.belongsTo(Category,{
    foreignKey:'category_id',
})

module.exports = Item