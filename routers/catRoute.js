const express = require('express')
const router = express.Router()
const Category = require('../models/catModel')

// get category
// router.get('/', async(req,res) => {
//     try{
//            const category = await Category.find()
//            res.json(category)
//     }catch(err){
//         res.send('Error ' + err)
//     }
// })
// get by id
router.get('/:id', async(req,res) => {
    try{
           const category = await Category.findById(req.params.id)
           res.json(category)
    }catch(err){
        res.send('Error ' + err)
    }
})

 // get all business by category
 router.get('/', function (req, res, next) {
    Category.aggregate([
     {
         $lookup:
         {
             from: 'businesses',
             localField: 'catID',
             foreignField: 'busID',
             as: 'businesses'
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

// post category
router.post('/', async(req,res) => {
    const category = new Category({
        catName: req.body.catName,
        description: req.body.description
    })

    try{
        const cat1 =  await category.save() 
        res.json(cat1)
    }catch(err){
        res.send('Error')
    }
})

// update category
router.put('/:id', (req, res) => {
    const category = {
        catName: req.body.catName,
        description: req.body.description
    };
    Category.findByIdAndUpdate(req.params.id, { $set:category}, {new:true}, (err, data) => {
        if(!err){
            res.status(200).json({ code:200, message: 'Category updated successfully',
            updateCategory: data})
        } else {
            console.log(err);
        }
    });
});

// delete category
router.delete('/:id', (req, res) => {
    Category.findByIdAndRemove(req.params.id, (err, data) => {
        if(!err) {
            res.status(200).json({ code:200, message: 'Category deleted successfully',
            deleteCategory: data });
        }
    });
})

module.exports = router