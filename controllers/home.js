const router = new (require('express')).Router();
const models = require('../models');

router.get('/', (req, res, next) => {
  res.render('index', { locals: { title: 'Welcome!' } });
});

module.exports = router;
