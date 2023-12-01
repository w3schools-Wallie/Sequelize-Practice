const {sequelize, testConnection} = require('./models/conn')
const Category = require('./models/categoryModel')
const Item = require('./models/itemModel')

// testConnection()

const findCategories = async () =>{
    const result = await Category.findAll();
    console.log(JSON.stringify(result))
}
// findCategories()
// find category by name

const findCategoryByName = async () =>{
    const result = await Category.findAll({where:{name:"fruits"}});
    console.log(JSON.stringify(result))
}
const findCategoryById = async () =>{
    const result = await Category.findByPk({where:{id:3}});
    console.log(JSON.stringify(result))
}
findCategoryById()

const createNewCategory = async () =>{
   await Category.create({
        name:"drinks"
    })
    findCategories()
}
createNewCategory()


const updatingCategory = async () =>{
    await Category.update({name:'sodas'}, {where:{id:9}})
    findCategories()
}
// updatingCategory()

const deleteCategory = async ()=>{
    await Category.destroy({where:{id:12}})
    findCategories()
}
// deleteCategory()



// Items
// find all in items
const findItems = async () => {
    const result = await Item.findAll()
    console.log(JSON.stringify(result))
}
// find by id
const findItemsByID = async ()=>{
    const result = await Item.findAll({where : {id: 3}})
    console.log(JSON.stringify(result))
}
