const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require('method-override');
const bodyParser = require('body-parser')

const ejs = require("ejs");

const Post = require("./models/Post");

const app = express();

//Connect DB
main()
  .then(console.log("db Bağlantısı Başarılı"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/cleanblog-test-db");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

//TEMPLATE ENGINE
app.set("view engine", "ejs");

//Middleware
app.use(express.static("public"));
//app.use(express.urlencoded({ extended: false }));
//app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(methodOverride('_method'));
app.use(methodOverride('_method',{
  methods:["POST","GET"]
}));

//Routes
app.get("/", async (req, res) => {
  const posts = await Post.find().sort("-dateCreated");
  res.render("index", { posts });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/add", (req, res) => {
  res.render("add_post"); //özelikle Böyle yaptım add deyince add_post.ejs render ettim
});

app.post("/addnewpost", async (req, res) => {
  await Post.create({
    ...req.body,
  });
  res.redirect("/");
});

app.get("/post/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render("post", { post });
});

app.get("/editpost/:id",async (req,res)=>{

    const post=await Post.findById(req.params.id);

    res.render("editpost",{post});

});

app.put("/post/:id",async (req,res)=>{
   // const post=await Post.findById(req.params.id);
   // post.title=req.body.title;
    //post.detail=req.body.detail;
    await Post.findOneAndUpdate({_id:req.params.id},{...req.body});
    res.redirect(`/post/${req.params.id}`);

});

app.delete("/deletpost/:id",async (req,res)=>{
  await Post.findByIdAndDelete(req.params.id);
  res.redirect("/");

});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı...`);
});
