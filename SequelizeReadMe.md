## Brief

### Preparation

Install Sequelize and the database driver for PostgreSQL:

```
npm install sequelize
npm install pg pg-hstore
```

*Note to instructor: Other drivers can also be installed for other SQL languages as needed.*

The database that will be used for this session is the `ecommerce` database that was created the previous session.

### Lesson Overview

In this lesson, learners would learn about ORMs and how they can be used to connect databases and backend servers. The first part of the lesson will be focusing on connecting a PostgreSQL database. The second part will be focusing on creating models and executing queries for the database.

---

## Part 1 - ORMs

Object relational mapping is the idea of being able to write queries using the object-oriented paradigm of programming language. An ORM is library that implements Object Relation Mapping. 

<img src="./assets/orm.PNG" />

### Connecting to a Database

Create a new directory called models and inside, a file called `conn.js`. This file will act as the connection file to the database.

```js
//conn.js
const { Sequelize } = require("sequelize");

// DB Connection Configuration
const sequelize = new Sequelize("ecommerce", "postgres", "postgres", {
    host: "localhost",
    dialect: "postgres",
});

// Test connection function
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
        return true;
    } catch (error) {
        console.error("Unable to connect to the database:", error);
        return false;
    }
}

module.exports = {sequelize, testConnection}
```

The new Sequelize establishes a connection to the database using the format:

```
new Sequelize(databaseName, username, password, {
    host: link to connect to
    dialect: SQL language.
})
```

After setting the connection file, test the connection by running the `testConnection` method in `index.js`

```js
//index.js
const {sequelize, testConnection} = require("./models/conn");

testConnection();
```

The console should show the message "Connection has been established successfully".

---

## Part 2 - Sequelize Models

A model is an abstraction that represents a table in a database. It tells Sequelize several things about the entity it represents, such as the name of the table in the database and which columns it has (and their data types). 

Models can be defined in two equivalent ways in Sequelize:

- Calling `sequelize.define(modelName, attributes, options)`
- Extending `Model` and calling `init(attributes, options)`

<img src="./assets/models.PNG" />

For this session, the `sequelize.define` option will be used to create models. Create a new file called categoryModel.js

```js
const { DataTypes } = require("sequelize");
const { sequelize } = require("./conn");

const Category = sequelize.define("category", {
    // The model name is typically the singular form of the table name.
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: false, //This is added to skip createdAt and updatedAt checks. 
    //You can modify your database table to add these rows as needed.
});

module.exports = Category;
```

### Mini-exercise

Create a model for the items table. Name the file itemModel.js. For category_id, no need to link it to the categories table for now.

---

## Part 3 - Querying to the database

After creating the models, data can now be queried using the ORM's query functions.

### Retrieving data

Retrieving data can be done using the `findAll()` method. It stands for the `SELECT` statement in SQL, and conditions can also be provided as needed.

Add the models in `index.js` and create a function called `findCategories`.

```js
//index.js
const {sequelize, testConnection} = require("./models/conn");
const Category = require("./models/categoryModel");
const Item = require("./models/itemModel");

testConnection();

const findCategories = async () => {
    const result = await Category.findAll();
    console.log(JSON.stringify(result));
}

findCategories();
```

Parameters can also be added to the findAll method in the form of an object.

```js
const findCategoriesByName = async () => {
    const result = await Category.findAll({where: {name: "fruits"}});
    console.log(JSON.stringify(result));
}

findCategoriesByName();
```

More parameters is available in the documentation.

### Creating data. 

Creating entries for a table can be done using the `create` method. The `create` method creates an object that has the same properties as the model and it gets written to the database.

```js
const createNewCategory = async () => {
    await Category.create({
        name: "meat"
    });
    findCategories();
}

createNewCategory();
```

*Note: make sure comment the function call after running once to prevent multiple entries being written to the database.*

### Editing data

Updating entries in a table can be done using the `update` method. The `update` method takes in an object and a condition for the update.

```js
const updatingCategory = async () => {
    await Category.update({name: "meats"}, {where: {id: 3}});
    findCategories();
}

updatingCategory();
```

### Deleting data

Deleting entries from a table can be done using the `destroy` method. The `destroy` method takes in a condition for deletion as an argument.

```js
const deleteCategory = async () => {
    await Category.destroy({where: {id: 3}});
    findCategories();
}

deleteCategory();
```

---

## Part 4 - Relationships and Associations

Table relationships can be established in models through the use of associations. 

The models are linked to each other by specifying the association. For example, the Item model is related to the Category model. For many-to-one relationship, the `belongsTo` methods can be used in the Item model.

```js
// itemModel.js
const Category = require("./categoryModel");
...

Item.belongsTo(Category,{
    foreignKey: "category_id"
});
```

This establishes that an Item belongs to a Category and the foreign key is via the `category_id`.

To use this association, the `findAll` method can include the Category model when looking for items.

```js
//js
const findItems = async () => {
    const results = await Item.findAll({ include: Category });
    console.log(JSON.stringify(results));
}

findItems();
```
