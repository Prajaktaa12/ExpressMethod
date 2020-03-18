let express = require("express");           //INITIALIZING EXPRESS
let Joi = require("@hapi/joi");            //FOR VALIDATION INITIALIZING HAPI-JOI
let model = require("../db/user");        //IMPORTING MODEL
let router = express.Router();           //IMPORTING ROUTER 
//FETCH THE DATA 
router.get("/allusers", async (req, res) => {
    let users = await model.find();
    res.send({ data:users });
});

//FETCH DATA BY SPECIFIC ID
router.get("/user/:id", async (req, res) => {
    let user = await model.findById(req.params.id);
    if (!user) { return res.status(404).send({ message: "Invalid user id" }) };
    res.send({ data: user });
});

//CREATE USER DATA
router.post("/user/newuser", async (req, res) => {
    let { error } = ValidationError(req.body);
    if (error) { return res.send(error.details[0].message) };
    let newData = new model({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        Address: req.body.Address,
        Gender: req.body.Gender,
        UserLogin: req.body.UserLogin
    });
    let data = await newData.save();
    res.send({ message: "thank you", d: data });
});

//UPDATE USER DATA
router.put("/user/updateuser/:id", async (req, res) => {
    let user = await model.findById(req.params.id);
    if (!user) { return res.status(404).send({ message: "Invalid id" }) };
    let { error } = ValidationError(req.body);
    if (error) { return res.send(error.details[0].message) };
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    await user.save();
    res.send({ message: "user data is updated" });
});


//REMOVE USER DATA
router.delete("/user/removeuser/:id", async (req, res) => {
    let user = await model.findByIdAndRemove(req.params.id);
    if (!user) { return res.status(404).send({ message: "Invalid id" }) };
    res.send({ message: "user data is removed" });
});

//CHECKING VALIDATION OF USER DATA
function ValidationError(error) {
    let Schema = Joi.object({
        firstname: Joi.string().min(4).max(100).required(),
        lastname: Joi.string().min(4).max(200).required(),
        Address: {
            Country: Joi.string().required(),
            city: Joi.string().required(),
            state: Joi.string().required()
        },
        Gender: Joi.string().required(),
        UserLogin: {
            emailId: Joi.string().required().email(),
            password: Joi.string().required()
        }
        
    });
    return Schema.validate(error);
}

//EXPORTING MODULE ROUTER
module.exports = router;