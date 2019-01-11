const express = require("express");

const Category = require('../models/Category');
const Orders = require('../models/Orders');
const Brand = require('../models/Brand');

const router = express.Router();

const createRouter = () => {
    router.get("/", (req, res) => {

        Category.find()
            .then(categories => res.send(categories))
            .catch(() => res.sendStatus(500));
    });

    router.get('/brands', async (req, res) => {

        try {
            const brand = await Brand.findOne({name: req.body.brand});

            const orders = await Orders.aggregate([
                {
                    $group: {
                        "_id": "$category",
                        "brand": {$first: "$brand"},
                        "name": {$first: "$name"}
                    }
                },
                {$project: {"category": 1, brand: 1, name: 1}},
                {$match: {brand: brand._id}}
            ]);


            res.send(orders);
        }
        catch (e) {
            res.sendStatus(500);
        }
    });

    return router;
};

module.exports = createRouter;