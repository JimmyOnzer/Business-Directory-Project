const express = require('express')
const router = express.Router()
const Business = require('../models/busModel')

// get business
// router.get('/', async(req,res) => {
//     try{
//            const business = await Business.find()
//            res.json(business)
//     }catch(err){
//         res.send('Error ' + err)
//     }
// })
// // get by id
// router.get('/:id', async(req,res) => {
//     try{
//            const business = await Business.findById(req.params.id)
//            res.json(business)
//     }catch(err){
//         res.send('Error ' + err)
//     }
// })

// get all business category
router.get('/', function (req, res, next) {
   Business.aggregate([
    {
        $lookup:
        {
            from: 'categories',
            localField: 'busID',
            foreignField: 'catID',
            as: 'businessCategories'
        }
    }
]).exec((err, result) => {
    if (err) {
        res.send(err)
    }
    if (result) {
        res.send({
            error: false,
            data: result
        })
    }
})
})


// post business
router.post('/', async(req,res) => {
    const business = new Business({
        busName: req.body.busName,
        cityName: req.body.cityName,
        catName: req.body.catName
    })

    try{
        const bus1 =  await business.save() 
        res.json(bus1)
    }catch(err){
        res.send('Error')
    }
})

// update business
router.put('/:id', (req, res) => {
    const business = {
        busName: req.body.busName,
        cityname: req.body.cityName,
        catName: req.body.catName
    };
    Business.findByIdAndUpdate(req.params.id, { $set:business}, {new:true}, (err, data) => {
        if(!err){
            res.status(200).json({ code:200, message: 'Business updated successfully',
            updateBusiness: data})
        } else {
            console.log(err);
        }
    });
});

// delete business
router.delete('/:id', (req, res) => {
    Business.findByIdAndRemove(req.params.id, (err, data) => {
        if(!err) {
            res.status(200).json({ code:200, message: 'Business deleted successfully',
            deleteBusiness: data });
        }
    });
})



module.exports = router