const mongoose = require('mongoose')


const busSchema = new mongoose.Schema({

    busName: {
        type: String,
        required: true
    },
    cityName: {
        type: String,
        required: true
    },
    catName: {
        type: String,
        required: true,
        default: false
    }

})

module.exports = mongoose.model('Business',busSchema)