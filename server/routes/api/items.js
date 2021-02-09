const express = require("express");
const router = express.Router();

//Item Model
const Item = require("../../models/Item");

// @route  GET api/items
// @desc   Get All items 
// @access Public
router.get("/", (req, res) => {

    Item.find({ username: req.body.username })
        .sort({ date: -1 })
        .then(items => res.json(items))

});

// @route  POST api/items
// @desc   Create An item 
// @access Public

router.post("/", (req, res) => {

    const newItem = new Item({
        username: req.body.username,
        title: req.body.title,
        description: req.body.description,

    });

    newItem.save()
        .then(item => res.json(item))
        .catch(err => console.log(err));

});

// @route  DELETE api/items/:_id
// @desc   Delete An item 
// @access Public
router.delete("/:id", (req, res) => {

    Item.findById(req.params.id)
        .then(item => item.remove()
            .then(() => res.json({ success: true })))

        .catch(err => res.status(404).json({ success: false }));

});

// @route  PATCH api/items
// @desc   Update An item 
// @access Public

router.patch("/:_id", (req, res) => {

    const filter = { username: req.body.username, _id: req.params._id };
    const updates = {
        title: req.body.title,
        description: req.body.description,

    };

    Item.findOneAndUpdate(filter, updates, { new: true, upsert: true },
        (dberr, dbres) => {
            if (dberr) {
                console.log(dberr);
            }
            else {
                console.log("SUccess")
                res.status(200).end();
                console.log(dbres);
            }
        });

});
module.exports = router;