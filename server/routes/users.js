const express = require("express");
const isEmpty = require("lodash/isEmpty");
const validator = require("validator")

const router = express.Router();

const validatorInput = (data) =>{
    let errors = {}
    if(validator.isEmpty(data.username)){
        errors.username = "Please fill in the username"
    }
    if(validator.isEmpty(data.password)){
        errors.password = "Please fill in the password"
    }
    // if(!validator.equals(data.password,data.passwordConfirmation)){
    //     errors.passwordConfirmation = "Please verify your password"
    // }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

router.post("/", (req,res)=>{
    console.log(req.body)
    const { errors, isValid } = validatorInput(req.body);
    console.log("Errors, isValid", errors, isValid)
    if(!isValid){
        res.status(400).json(errors)
    }
})

module.exports = router;