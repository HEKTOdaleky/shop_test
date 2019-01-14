const express = require("express");

const Orders = require('../models/Orders');
const Category = require('../models/Category');
const Brand = require('../models/Brand');

const router = express.Router();

const createRouter = () => {
    router.get("/", async (req, res) => {
        const {brand, category} = req.query;

        try {
            const categoryResult = await Category.findOne({name: category});
            const brandResult = await Brand.findOne({name: brand});
            const orderResult = await Orders.find({brand: brandResult._id, category: categoryResult._id});

            res.send(orderResult)
        }

        catch (e) {
            res.sendStatus(500);
        }
    });

    router.get('/id', async (req, res) => {
        console.log(req.query.id)
        try {
            const order = await Orders.findOne({orderNum: req.query.id}).populate('brand');
            if (order) {
                res.send(order);
            }
            res.status(404).send({message: 'Order not found'});
        }
        catch (e) {
            res.sendStatus(500);
        }
    });

    return router;
};

module.exports = createRouter;