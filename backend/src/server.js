require('dotenv').config();
// const express = require('express');
const mongoose = require('mongoose');
const port = process.env.PORT;
const app = require('./app');


mongoose.connect(
    process.env.MONGO_URI,
    {}).then(result => {
        console.log("db conntected")
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })
    }
    ).catch(err => console.log(err))
