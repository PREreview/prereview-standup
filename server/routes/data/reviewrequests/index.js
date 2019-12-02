var express = require("express");
var router = express.Router();

var submit = require("./submit");

router.use("/reviewrequests", [submit]);

module.exports = router;
