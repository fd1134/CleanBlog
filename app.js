const express=require("express");
const ejs=require("ejs");

const app=express();

//Middlware
app.use(express.static("public"));

// Template Engine
app.set('view engine', 'ejs')

app.get("/",(req,res)=>{
    
    res.render("index")

});

const port=3000;
app.listen(port,()=>{
    console.log(`Sunucu ${port} portunda Başlatıldı`);
});