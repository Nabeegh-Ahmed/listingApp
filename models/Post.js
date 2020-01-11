const mongoose = require("mongoose");
const postSchema = {
    title: String,
    description: String,
    contact: Number,
    askPrice: Number,
    img: String,
    category: String,
    email: String
  };  
  
  const Post = mongoose.model("Post", postSchema);

  module.exports = Post;