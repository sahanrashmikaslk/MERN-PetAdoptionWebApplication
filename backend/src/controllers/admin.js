const createHttpError = require('http-errors')
const bcrypt = require('bcrypt');
const CompanyModel = require('../model/admin');
const jwt = require('jsonwebtoken');

exports.register = async (req, res, next) => {
    const email = req.body.email
    const password = req.body.password
    const name = req.body.name
    try {
        if (!email || !password || !name) {
            throw createHttpError(400, 'Missing required parameters')
        }

        const isCompanyAvailable = await CompanyModel.findOne({ email: email }).exec();

        if (isCompanyAvailable) {
            throw createHttpError(400, 'Company already exists')
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const company = new CompanyModel({
            name: name,
            email: email,
            password: hashedPassword
        })

        const result = await company.save();

        res.status(201).send(result);


    } catch (error) {
        next(error)

    }


}


exports.login = async (req, res, next) => {
    const email = req.body.email
    const password = req.body.password

    try {
        if (!email || !password) {
            throw createHttpError(400, 'Missing required parameters')
        }

        const company = await CompanyModel.findOne({ email: email }).exec();

        if (!company) {
            throw createHttpError(400, 'User does not exist')
        }

        const isPasswordValid = await bcrypt.compare(password, company.password);

        if (!isPasswordValid) {
            throw createHttpError(400, 'Invalid credentials')
        }

        const user = await CompanyModel.findOne({ email: email }).exec();

        const token = jwt.sign(
            {
                user_id: user._id,
                email: user.email,
            },
            process.env.JWT_TOKEN_KEY,
            {
                expiresIn: "4h",
            }
        )

        user.token = token;

        const result = await user.save();

        const response = {
            id: result._id,
            name: result.name,
            email: result.email,
            token: result.token,
            userType: "admin"
        }

        console.log(response);

        res.status(200).send(response);


    } catch (error) {
        next(error)
    }

}

