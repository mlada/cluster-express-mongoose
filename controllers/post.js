const express = require('express');
const router = new express.Router();
const models = require('../models');

router.get('/', function(req, res, next) {
  if (!req.user) return res.redirect('/login');
  res.render('addpost', {
    user: req.user
  });
});

router.post('/', function(req, res, next) {
  if (!req.user) return res.redirect('/login');
  const post = new models.Post(req.body);
  post
    .save()
    .then(() => {
      res.redirect('/post/' + post.slug);
    })
    .catch(next);
});

router.get('/:slug', (req, res, next) => {
  models.Post.findOne({
    slug: req.params.slug
  })
    .exec()
    .then(post => {
      if (!post) res.redirect('/#notfound');
      res.render('post', {
        user: req.user,
        post
      });
    })
    .catch(next);
});

module.exports = router;
