const router = require("express").Router();
const passport = require("passport");

router.get("/", (req, res) => {
  res.render("login.ejs");
});

router.post(
  "/",
  passport.authenticate("local", {
    failureRedirect: "/signup",
    successRedirect: "/content",
  })
);

module.exports = router;
