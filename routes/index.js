const router = require("express").Router();

//Import router
const public = require("./public");
const protected = require("./protected");

//Use routes
router.use("/", public);
router.use("/", protected);

module.exports = router;
