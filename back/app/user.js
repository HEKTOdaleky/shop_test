const express = require('express');
const User = require('../models/User');

const createRouter = () => {
    const router = express.Router();

    router.get('/', async (req, res) => {
        const users = await User.find();

        if (users) {
            res.send(users);
        }
    });

    router.post('/check', async (req, res) => {
        const token = req.get('Token');
        if (!token)
            res.status(400).send({message: 'Empty token'});
        try {
            const user = await  User.findOne({token});
            if (!user) {
                res.sendStatus(404);
            }
            res.send({
                user: {
                    role: user.role, username: user.username
                }, token: user.token
            })
        }

        catch (e) {
            res.sendStatus(500);
        }
    });

    router.post('/', (req, res) => {
        if (req.body.password !== req.body.confirm)
            res.status(400).send({message: "Passwords do not match"});

        const user = new User({
            username: req.body.username,
            password: req.body.password
        });


        user.save()
            .then(user => res.send(user))
            .catch(error => res.status(400).send(error))
    });


    router.post('/change-password', async (req, res) => {
        try {

            const user = await User.findOne({username: req.body.username});
            if (!user) {
                res.status(404).send({message: "User does not exist"});

            }

            else {
                if (req.body.password !== req.body.confirmPassword) {
                    res.status(400).send({_message: "Passwords do not match"});
                    return;
                }

                user.password = req.body.password;
                user.token = user.generateToken();
                await user.save();
                res.send({user, message: "The password change is successful"})
            }
        }
        catch (e) {
            res.send({error: e, message: "Unknown error"})
        }

    });


    router.post('/sessions', async (req, res) => {
        let user;

        try {
            user = await User.findOne({username: req.body.username});
        }
        catch (error) {
            res.status(400).send({message: error})
        }

        if (!user) {
            return res.status(400).send({error: 'Incorrect username or password'});
        }
        let isMatch;
        try {
            isMatch = await user.checkPassword(req.body.password);
        }
        catch (error) {
            res.status(400).send({message: error})

        }

        if (!isMatch) {
            return res.status(400).send({error: 'Incorrect username or password'});
        }

        const token = user.generateToken();
        user.token = token;
        try {
            await user.save();
        }
        catch (error) {
            res.status(400).send({message: error})

        }

        return res.send({message: 'Success', user, token});
    });


    router.delete('/sessions', async (req, res) => {
        const token = req.get('Token');
        const success = {message: 'Success'};

        if (!token) return res.send(success);
        let user;
        try {
            user = await User.findOne({token});
        }
        catch (error) {
            res.status(400).send({message: error})

        }

        if (!user) return res.send(success);

        user.generateToken();
        try {
            await user.save();
        }
        catch (error) {
            res.status(400).send({message: error})

        }

        return res.send(success);
    });

    return router;
};

module.exports = createRouter;