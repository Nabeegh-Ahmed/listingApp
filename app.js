const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const multer  = require('multer');
const bodyParser = require("body-parser");


const app = express();

// Passport Config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Multer
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/imgUpload/');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if(file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ 
  fileFilter: fileFilter,
  storage: storage,
  
  limits: { fileSize: 1024*1024*5 } 
});
// Multer End
const Post = require('./models/Post');



app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res){
  Post.find({}, (err, posts) => {
      res.render("home", {
          posts:posts
      });
  });
});

app.get("/upload", (req, res) => {
  res.redirect("/dashboard");
  //  res.render("upload");
});

app.get("/categories/:category", (req, res) => {    
  const category = req.params.category;
  Post.find({"category": category}, (err, posts) => {
      res.render("category", {
          posts: posts
      })
  })
});

// Upload Post Request
app.post("/upload", upload.single("prodImage"), function(req, res){
  const post = new Post({
      title: req.body.title,
      description: req.body.description,
      contact: req.body.contact,
      askPrice: req.body.askPrice,
      category: req.body.category,
      email: req.body.email,
      img: req.file.originalname
  });

  post.save(function(err){
      if(!err){
          res.redirect("/");
      } else {
          console.log(err);
      }
  });
});


// Search Request
app.post("/search", (req,res) => {
  let results = [];
  Post.find({}, (err, posts) => {
      posts.forEach((post) => {
          let query = req.body.query.toLowerCase();
          let codes = [];
          for(let i=0; i<256; i++){
              codes[i] = 0;
          }
          if(post.title.length >= query.length) {
              for(let i=0; i<query.length; i++){
                  for(let j=0; j<post.title.length; j++){
                      if(query[i] == post.title[j].toLowerCase()){
                          codes[query[i].charCodeAt(0)] = 1;
                      }
                  }
              }
          }
          let count = 0;
          for(let i=0; i<256; i++){
              count += codes[i];
          }
          if((count/query.length)*100 >= 60){
              results.push(post);
          }
      });
      res.render("searchResult", {
          query: req.body.query,
          results: results         
      });
      
  });
  
});

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
