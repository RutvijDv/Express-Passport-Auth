const router = require("express").Router();
const User = require("../../models/user.model");

router.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("home.ejs", { user: req.user });
  } else {
    res.render("home.ejs", { user: null });
  }
});

module.exports = router;
