const express = require('express')
const router = express.Router()
const City = require('../models/cityModel')

// get city
// router.get('/', async(req,res) => {
//     try{
//            const city = await City.find()
//            res.json(city)
//     }catch(err){
//         res.send('Error ' + err)
//     }
// })
// get by id
router.get('/:id', async(req,res) => {
    try{
           const city = await City.findById(req.params.id)
           res.json(city)
    }catch(err){
        res.send('Error ' + err)
    }
})

// get all cities
router.get('/', function (req, res, next) {
   City.aggregate([
    {
        $lookup:
        {
            from: 'businesses',
            localField: 'cityID',
            foreignField: 'busID',
            as: 'cities'
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

// post city
router.post('/', async(req,res) => {
    const city = new City({
        cityName: req.body.cityName,
        address: req.body.address
    })

    try{
        const city1 =  await city.save() 
        res.json(city1)
    }catch(err){
        res.send('Error')
    }
})

// update city
router.put('/:id', (req, res) => {
    const city = {
        cityName: req.body.cityName,
        address: req.body.address
    };
    City.findByIdAndUpdate(req.params.id, { $set:city}, {new:true}, (err, data) => {
        if(!err){
            res.status(200).json({ code:200, message: 'City updated successfully',
            updateCity: data})
        } else {
            console.log(err);
        }
    });
});

// delete city
router.delete('/:id', (req, res) => {
    City.findByIdAndRemove(req.params.id, (err, data) => {
        if(!err) {
            res.status(200).json({ code:200, message: 'City deleted successfully',
            deleteCity: data });
        }
    });
})

module.exports = router