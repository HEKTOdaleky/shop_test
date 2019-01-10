const mongoose = require("mongoose");
const config = require("./config");

const Orders = require("./models/Orders");
const Category = require("./models/Category");
const SubCategory = require("./models/SubCategory");
const Brand = require("./models/Brand");

mongoose.connect(config.db.url + "/" + config.db.name, {useNewUrlParser: true});

const db = mongoose.connection;

const collections = ["orders","categories","subcategories","brands"];

db.once("open", async () => {
    collections.forEach(async collectionName => {
        try {
            await db.dropCollection(collectionName);
        } catch (e) {
            console.log(`Collection ${collectionName} did not exist in DB`);
        }
    });

    const [clothing, boots, hat] = await Category.create(
        {
            name: "clothing"
        },
        {
            name: "boots"
        },
        {
            name: "hat"
        }
    );

    const [jacket, running, cap] = await SubCategory.create(
        {
            name: "jacket",
            category: clothing._id
        },
        {
            name: "running",
            category: boots._id
        },
        {
            name: "cap",
            category: hat._id
        }
    );

    const [adidas, nike] = await Brand.create({
            name: "Adidas"
        },
        {
            name: "Nike"
        });

    await Orders.create(
        {
            name: "sportman",
            brand: adidas._id,
            subcategory: jacket._id,
            price: 100,
            image: "1.jpg",
            about: "fjdofsjdofjdsofjdsopfjsdofodpsfjdopsfjdopsfjdsopfs"
        },
        {
            name: "air",
            brand: nike._id,
            category: "boots",
            subcategory: running._id,
            price: 110,
            image: "2.jpg",
            about: "fjdofsjdofjdsofjdsopfjsdofodpsfjdopsfjdopsfjdsopfs"
        },
        {
            name: "air",
            brand: nike._id,
            category: "hat",
            subcategory: cap._id,
            price: 20,
            image: "3.jpg",
            about: "fdsfesjpfeopwf"
        },
    );

    db.close();
});
