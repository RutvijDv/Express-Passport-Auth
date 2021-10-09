const router = require("express").Router();
const genPassword = require("../../utils/password.utils").genPassword;
const User = require("../../models/user.model");
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  res.render("signup.ejs");
});

router.post("/", (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  user
    .save()
    .then(() => {
      req.login(user, (err) => {
        if (err) next(err);
        else res.redirect("/content");
      });
    })
    .catch((err) => {
      console.log("Error creating user");
      next(err);
    });
});

module.exports = router;
