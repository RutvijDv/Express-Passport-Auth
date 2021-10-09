const router = require("express").Router();

//Import router
const content = require("./content");

//Use routes
router.use("/content", content);

module.exports = router;
