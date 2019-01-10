const express = require("express");

const Orders = require('../models/Orders');

const router = express.Router();

const createRouter = () => {
    router.get("/", (req, res) => {
        Orders.find()
            .then(orders => res.send(orders))
            .catch(() => res.sendStatus(500));
    });

    return router;
};

module.exports = createRouter;