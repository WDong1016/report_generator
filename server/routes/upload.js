const express = require("express");
const isEmpty = require("lodash/isEmpty");
const validator = require("validator")

const router = express.Router();

router.post("/", (req,res)=>{
    console.log(req.body)
    // const { errors, isValid } = validatorInput(req.body);
    // console.log("Errors, isValid", errors, isValid)
    // if(!isValid){
    //     res.status(400).json(errors)
    // }
})

module.exports = router;