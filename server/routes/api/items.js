const express = require("express");
const router = express.Router();

//Item Model
const Item = require("../../models/Item");

//CORS MIDDLEWARE
const CORS = (origin, header, method) => {

    return (req,res,next) => {
            res.set({
                'Access-Control-Allow-Origin' : origin,
                'Access-Control-Allow-Methods' : method,
                'Access-Control-Allow-Headers' : header
            })
            next();
        }
}

//CORS ROUTES
router.options('/*', CORS('*','*','*'), (req,res) => {
    res.status(200).end();
})

// @route  GET api/items
// @desc   Get All items 
// @access Private
router.get("/:uname", CORS('*','*','*'), (req, res) => {

    Item.find({ username: req.params.uname })
        .sort({ date: -1 })
        .then(items => res.status(200).json(items), err => {
            res.status(500).json({err : "an internal server error occurred."});
        })
});

// @route  POST api/items
// @desc   Create An item 
// @access Private

router.post("/", CORS('*','*','*'), (req, res) => {

    const newItem = new Item({
        username: req.body.username,
        title: req.body.title,
        description: req.body.description,
    });

    console.log(newItem);

    newItem.save()
        .then(item => res.status(200).json(item))
        .catch(err => {
            console.log(err);
            res.status(500).json({err : "an internal server error occurred."})
        });
});

// @route  DELETE api/items/:_id
// @desc   Delete An item 
// @access Private
router.delete("/:id", CORS('*','*','*'), (req, res) => {

    Item.findById(req.params.id)
        .then(item => item.remove()
            .then(() => res.status(200).json({ success: true })))
        .catch(err => res.status(404).json({ err : true }));

});

// @route  PATCH api/items
// @desc   Update An item 
// @access Private

router.patch("/:_id", CORS('*','*','*'), (req, res) => {

    const filter = { _id: req.params._id };
    const updates = {
        title: req.body.title,
        description: req.body.description,

    };

    Item.findOneAndUpdate(filter, updates, { new: true, upsert: true },
        (dberr, dbres) => {
            if (dberr) {
                console.log(dberr);
                res.status(500).json({err : "An internal error occurred."});
            }
            else {
                console.log("Success")
                res.status(200).json({success : true});
                console.log(dbres);
            }
        });

});
module.exports = router;