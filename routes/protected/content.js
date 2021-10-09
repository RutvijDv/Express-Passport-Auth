const router = require("express").Router();
const passport = require("passport");
const isAuth = require("./../../middlewares/auth.middleware").isAuth;

router.get("/", isAuth, (req, res) => {
  res.render("content.ejs", { user: req.user });
});

module.exports = router;
