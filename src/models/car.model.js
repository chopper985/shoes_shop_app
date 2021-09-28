const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Car = new Schema(
    {
        // idCarCompany: {
        //     type: String, default: ''
        // },
        // idCar: {
        //     type: String, default: ''
        // },
        carName: {
            type: String,
            default: '',
        },
        colour: {
            type: String,
            default: '',
        },
        vehicles: {
            type: String,
            default: '',
        },
        origin: {
            type: String,
            default: '',
        },
        gear: {
            type: String,
            default: '',
        },
        yearOfManufacture: {
            type: String,
            default: '',
        },
        numberOfSeats: {
            type: String,
            default: '',
        },
        vehicleCondition: {
            type: String,
            default: '',
        },
        designs: {
            type: String,
            default: '',
        },
        price: {
            type: String,
            default: '',
        },
        // shippingFee: {
        //     type: String, default: ''
        // },
        // fcm: {
        //     type: String, default: ''
        // }
    },
    { timestamps: true },
);

module.exports = mongoose.model('Car', Car);
