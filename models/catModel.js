const mongoose = require('mongoose')


const catSchema = new mongoose.Schema({

    catName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('Category',catSchema)