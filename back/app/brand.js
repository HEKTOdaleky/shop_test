const express = require("express");

const Brand = require('../models/Brand');

const router = express.Router();

const createRouter = () => {
    router.get("/", (req, res) => {

       Brand.find()
            .then(brands => res.send(brands))
            .catch(() => res.sendStatus(500));
    });

    return router;
};

module.exports = createRouter;