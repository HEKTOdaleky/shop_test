const express = require("express");

const Category = require('../models/Category');

const router = express.Router();

const createRouter = () => {
    router.get("/", (req, res) => {

        Category.find()
            .then(categories => res.send(categories))
            .catch(() => res.sendStatus(500));
    });

    return router;
};

module.exports = createRouter;