const router = new (require("express")).Router();

router.get("/", (req, res, next) => {
  if (!req.user) {
    req.message = "not logged";
    res.redirect("/login");
  }
  res.render("cabinet", { locals: { user: req.user } });
});

module.exports = router;
