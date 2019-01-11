const express = require("express");

const SubCategory = require('../models/SubCategory');

const router = express.Router();

const createRouter = () => {
    router.get("/", (req, res) => {
        const category = req.body.category;
        if (category)
            SubCategory.find({category})
                .populate('category')
                .then(sub => {
                    res.send(sub);
                })
                .catch(() => res.sendStatus(500));
        else
            SubCategory.find()
                .populate('category')
                .then(sub => {
                    res.send(sub);
                })
                .catch(() => res.sendStatus(500));
    });

    return router;
};

module.exports = createRouter;