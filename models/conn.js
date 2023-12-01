const {Sequelize} = require('sequelize')

const sequelize = new Sequelize("ecommerce", "", "", {
    host:'localhost',
    dialect: 'postgres',
})

async function testConnection(){
    try{
        await sequelize.authenticate();
        console.log("we are connected!");
        return true

    }catch(err){
        console.error('sorry wrong db :(')
        return false 
    }
}
// testConnection()

module.exports = {sequelize, testConnection}
