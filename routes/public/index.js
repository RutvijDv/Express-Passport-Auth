const router = require("express").Router();

//Import router
const signup = require("./signup.route");
const login = require("./login.route");
const logout = require("./logout.route");
const home = require("./home.routes");

//Use routes
router.use("/signup", signup);
router.use("/login", login);
router.use("/logout", logout);
router.use("/", home);

module.exports = router;
