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
            const brand = await Brand.findOne({name: req.query.brand});


            const orders = await Orders.aggregate([
                {
                    $group: {
                        "_id": "$category",
                        "brand": {$first: "$brand"},
                        "name": {$first: "$name"},
                        "category": {$first: "$category"}
                    }
                },
                {$project: {"_id": 0, brand: 1, name: 1, category: 1}},
                {$match: {brand: brand._id}}
            ]);

            const tmp = await Brand.populate(orders, {path: 'brand'});
            const categories = await Category.populate(tmp, {path: 'category'});

            res.send(categories);
        }
        catch (e) {
            res.sendStatus(500);
        }
    });

    return router;
};

module.exports = createRouter;