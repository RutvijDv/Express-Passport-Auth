const router = require("express").Router();
const passport = require("passport");

router.post("/", (req, res, next) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
