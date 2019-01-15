const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./config");

const orders = require('./app/orders');
const categories = require('./app/categories');
const subCategories = require('./app/subcategories');
const brands = require('./app/brand');
const user = require('./app/user');

const app = express();

const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(config.db.url + "/" + config.db.name, {useNewUrlParser: true});

const db = mongoose.connection;

db.once("open", () => {
    console.log("Mongoose connected!");

    app.listen(port, () => {
        app.use('/orders', orders());
        app.use('/categories', categories());
        app.use('/subcategories', subCategories());
        app.use('/brands', brands());
        app.use('/user', user());

        console.log(`Server started on ${port} port!`);
    });
});