const createHttpError = require('http-errors')
const ProductModel = require('../model/pets')
const mongoose = require('mongoose');

exports.create = async (req, res, next) => {
    const {
        petname,
        pettype,
        petbreed,
        petage,
        description,
        location
    } = req.body;

    try {
        const { image } = req.files;
        if (!image) {
            throw createHttpError(404, "Image not found")
        }
        if (!image.mimetype.startsWith('image')) {
            throw createHttpError(400, 'Only images are allowed');
        }
        let filepath = __dirname + '../../../public/pets/' + image.name
        image.mv(filepath);

        let filepathtoUplaod = '/public/pets/' + image.name

        if (!petname || !pettype || !petbreed || !petage || !location) {
            throw createHttpError(400, 'Please provide all the required fields');
        }

        const pet = new ProductModel({
            petname,
            pettype,
            petbreed,
            petage,
            image: filepathtoUplaod,
            description,
            location,
            status: 'available'
        });

        const result = await pet.save();

        res.status(201).send(result);





    } catch (error) {

        next(error)

    }

}

exports.update = async (req, res, next) => {

    const petid = req.params.id;

    const {
        petname,
        pettype,
        petbreed,
        petage,
        description,
        location
    } = req.body;

    try {

        if (!petid) {
            throw createHttpError(400, 'Please provide pet id');
        }

        //check mongoose id
        if (!mongoose.isValidObjectId(petid)) {
            throw createHttpError(400, 'Please provide valid pet id');
        }

        //if req.files is not empty
        let pth;
        if (req.files) {
            const { image } = req.files;
            if (!image) {
                throw createHttpError(404, "Image not found")
            }
            if (!image.mimetype.startsWith('image')) {
                throw createHttpError(400, 'Only images are allowed');
            }
            let filepath = __dirname + '../../../public/pets/' + image.name
            image.mv(filepath);

            pth = '/public/pets/' + image.name
        }

        const pet = await ProductModel.findById(petid).exec();

        if (!pet) {
            throw createHttpError(404, 'Pet not found');
        }

        pet.petname = petname || pet.petname;
        pet.pettype = pettype || pet.pettype;
        pet.petbreed = petbreed || pet.petbreed;
        pet.petage = petage || pet.petage;
        pet.image = pth || pet.image;
        pet.description = description || pet.description;
        pet.location = location || pet.location;

        const result = await pet.save();

        res.status(200).send(result);



    } catch (error) {

        next(error)

    }
}

exports.getAll = async (req, res, next) => {

    try {
        const result = await ProductModel.find().exec();
        res.status(200).send(result);
    } catch (error) {
        next(error)
    }

}

exports.getById = async (req, res, next) => {

    try {
        const id = req.params.id;
        const result = await ProductModel.findById(id).exec();
        res.status(200).send(result);
    } catch (error) {
        next(error)
    }

}

exports.delete = async (req, res, next) => {

    try {
        const id = req.params.id;
        const result = await ProductModel.findByIdAndDelete(id).exec();
        res.status(200).send(result);
    } catch (error) {
        next(error)
    }

}

exports.search = async (req, res, next) => {

    // const search = req.params.search;

    try {
        const search = req.params.search;
        
        //user regex to search for petname,type,breed, case insensitive, and return all results
        const result = await ProductModel.find({ $or: [{ petname: { $regex: search, $options: 'i' } }, { pettype: { $regex: search, $options: 'i' } }, { petbreed: { $regex: search, $options: 'i' } }] }).exec();

        res.status(200).send(result);
    } catch (error) {
        next(error)
    }

}
