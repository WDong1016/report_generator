const express = require("express");
const isEmpty = require("lodash/isEmpty");
const validator = require("validator")

const getPasswd = require("../components/getPasswd")

const router = express.Router();

const validatorInput = async  (data) => {
    let errors = {}
    if (validator.isEmpty(data.username)) {
        errors.username = "Please fill in the username"
    }
    if (validator.isEmpty(data.password)) {
        errors.password = "Please fill in the password"
    } else {
        let passwd = await getPasswd(data.username)
        console.log("passwd:", passwd)
        if (!validator.equals(data.password, passwd)) {
            errors.password = "Please verify your password"
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

router.post("/", async (req, res) => {
    console.log(req.body)
    const { errors, isValid } = await validatorInput(req.body);
    console.log("Errors, isValid", errors, isValid)
    if (!isValid) {
        res.status(400).json(errors)
    }
})

module.exports = router;