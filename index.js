const express = require("express");
const mongoose = require("mongoose");
const Article = require("./models/article");
const articleRouter = require("./routes/articles");
const methodOverride = require("method-override");
const app = express();

mongoose.connect("mongodb://localhost/blog");

//Middlewares
//Setting up view engine
app.set("view engine", "ejs");
// app.set("views", "./views");

//For body parser
app.use(express.urlencoded({ extended: false }));

//For method overriding inorder to be able to use delete and many more methods which is limited to only get/post
app.use(methodOverride("_method"));

//Route for index / main route
app.get("/", async (req, res) => {
  const articles = await Article.find().sort({
    createdAt: "desc",
  });
  res.render("articles/index", { articles: articles });
});

//Routing to routes directory and other routes
app.use("/articles", articleRouter);

//Listening on port
app.listen(4000);
