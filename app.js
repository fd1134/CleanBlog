const express=require("express");
const ejs=require("ejs");

const app=express();

//TEMPLATE ENGINE
app.set('view engine', 'ejs');

//Middleware
app.use(express.static('public'));

//Routes
app.get("/",(req,res)=>{
    
    res.render("index")

});

app.get("/about",(req,res)=>{

    res.render("about")
});

app.get("/add",(req,res)=>{
    res.render("add_post") //özelikle Böyle yaptım add deyince add_post.ejs render ettim 
});



const port=3000;
app.listen(port,()=>{
    console.log(`Sunucu ${port} portunda Başlatıldı`);
});