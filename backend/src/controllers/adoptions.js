const createHttpError = require('http-errors')
const bcrypt = require('bcrypt');
const OrderModel = require('../model/adoptions')
const BuyerModel = require('../model/users');
const PetModel = require('../model/pets')

exports.create = async (req, res, next) => {
    const user_id = req.body.user_id
    const pet_id = req.body.pet_id
    try {
        if (!user_id || !pet_id) {
            throw createHttpError(400, 'Missing required parameters')
        }

        const isUserAvailable = await BuyerModel.findOne({ _id: user_id }).exec();

        if (!isUserAvailable) {
            throw createHttpError(400, 'User doesnt exists')
        }

        const isPet = await PetModel.findById(pet_id).exec();

        if (!isPet) {
            throw createHttpError(400, 'Pet doesnt exists')
        }


        const order = new OrderModel({
            user_id: user_id,
            user_name: isUserAvailable.name,
            pet_id: pet_id,
            pet_name: isPet.petname,
            status: "Request",
            date: new Date().toISOString()
        })

        const result = await order.save();

        res.status(201).send(result);

    } catch (error) {
        next(error)

    }




}

exports.getAll = async (req, res, next) => {

    try {
        const result = await OrderModel.find({status:"Request"}).exec();
        res.status(200).send(result);
    } catch (error) {
        next(error)
    }

}



