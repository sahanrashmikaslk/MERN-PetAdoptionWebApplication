require('dotenv').config()
const express = require('express')
const app = express()
const createHttpError = require('http-errors')
const BuyerRouter = require('./routes/buyer')
const CompanyRouter = require('./routes/company')
const ProductRouter = require('./routes/products')
const OrderRouter = require('./routes/order')
const fileUpload = require('express-fileupload');

app.use(fileUpload());

app.use('/public/pets', express.static('public/pets'))

//cors
const cors = require('cors')
app.use(cors())

app.use(express.json())

app.use('/api/v1/users', BuyerRouter);
app.use('/api/v1/admin', CompanyRouter);
app.use('/api/v1/pets', ProductRouter)
app.use('/api/v1/adoptions', OrderRouter)

app.use((err, req, res, next) => {
    if (createHttpError.isHttpError(err)) {
        res.status(err.status).send({ message: err.message })
    } else {
        res.status(500).send({ message: err.message })
    }
    //error unknown
    res.status(500).send({ message: "Error Unknown" })
})

module.exports = app;