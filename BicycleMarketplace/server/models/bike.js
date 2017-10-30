const mongoose = require('mongoose');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');
const { Schema } = mongoose;

const BikeSchema = Schema({
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true, minlength: 2, unique: true },
    description: { type: String, required: true, maxlength: 500 },
    price: { type: Number, required: true, min: 1 },
    location: { type: String, required: true },
    image: { type: String, required: true },
}, {
    timestamps: true
});

BikeSchema.plugin(uniqueValidator, { message: '{PATH} must be unique!' });

const Bike = mongoose.model('Bike', BikeSchema);