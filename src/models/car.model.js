const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Car = new Schema(
    {
        carName: {
            type: String,
            default: '',
        },
        colour: {
            type: String,
            default: '',
        },
        carLife: {
            type: String,
            default: '',
        },
        origin: {
            type: String,
            default: '',
        },
        body: {
            type: String,
            default: '',
        },
        numberOfSeats: {
            type: String,
            default: '',
        },
        yearOfManufacture: {
            type: String,
            default: '',
        },
        longs: {
            type: String,
            default: '',
        },
        overallSize: {
            type: String,
            default: '',
        },
        fuelConsumption: {
            type: String,
            default: '',
        },
        topSpeed: {
            type: String,
            default: '',
        },
        airBag: {
            type: String,
            default: '',
        },
        seat: {
            type: String,
            default: '',
        },
        engineType: {
            type: String,
            default: '',
        },
        tireParameters: {
            type: String,
            default: '',
        },
        frontBrake: {
            type: String,
            default: '',
        },
        wattage: {
            type: String,
            default: '',
        },
        gear: {
            type: String,
            default: '',
        },
        status: {
            type: String,
            default: '',
        },
        price: {
            type: Number,
            default: '',
        },
        CarInformation: {
            type: String,
            default: '',
        },
        Image: {
            type: String,
            default: '',
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('Car', Car);
