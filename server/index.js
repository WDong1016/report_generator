const express = require("express");
const app = express();
const users = require("./routes/users")
const debug = require("debug")("my-application");
const bodyParser = require("body-parser")

app.use(bodyParser.json());
app.use("/api/users", users);

app.listen(9999, (req,res)=>{
    debug("Server running at :9999")
})