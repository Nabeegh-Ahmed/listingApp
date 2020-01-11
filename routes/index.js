const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

const Post = require('../models/Post');

// Welcome Page
// router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));



// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  Post.find({email: req.user.email}, (err, posts) => {
    res.render('dashboard', {
      user: req.user,
      posts: posts
    })    
  }));  


module.exports = router;
