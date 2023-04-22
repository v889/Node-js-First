import express from "express";
import path from "path";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
 const server=express();
 // seeting up view engine
 server.set("view engine","ejs");


 // for static
 server.use(express.static(path.join(path.resolve(),"public")));
 server.use(express.urlencoded({extended:true}))
 server.use(cookieParser());

 //schema
 const messageSchema=new mongoose.Schema({
    name:String,
    email:String,
 });

 const message=mongoose.model("Message",messageSchema)

 mongoose.connect("mongodb://127.0.0.1:27017",{
    "dbname":"Backend",
 })
 .then(()=>console.log("Database Conneted"))
 .catch((e)=>console.log(e))
server.get("/",(req,res)=>{
    const {token}=req.cookies;
    if(token){
    res.render("logout");}
    else{
        res.redirect("login");
    }
    //res.render("index",{name:"vishal"})
})
server.get("/login",(req,res)=>{
    res.render("login")
})
server.get("/logout",(req,res)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now())

    });
    res.redirect("/");
})

server.post("/login",(req,res)=>{
    res.cookie("token","iamin",{
        expires:new Date(Date.now()+60*1000)

    });
    res.redirect("/");
})
server.post("/contact", async (req,res)=>{
    console.log(req.body);
    await message.create({name:req.body.name,email:req.body.email}).then(()=>{
        res.send("Nice")
    });
    res.render('sucess');
})
server.get("/users",(req,res)=>{

    res.json({users})
})
 server.listen(8000,()=>{
    console.log("Server is working");
 })


/*import http from "http";
import fs from "fs";
//import gfname from "./features.js";
//import { gfname2,gfname3} from "./features.js";
//import as object
//import * as myobj from "./features.js"
//console.log(myobj)

//console.log(http);
import path from "path";
console.log(path.extname("/home/random/index.html"))
const server=http.createServer((req,res)=>{
    console.log(req.method);
    if(req.url==='/about'){
        res.end("<h1>About </h1>");


    }
    else if(req.url==='/'){
        const home =fs.readFile("./index.html",(err,home)=>{
            res.end(home);
        })
       
    }
   else{
      res.end("<h1>Page not found.</h1>")
   }
   

    
});
server.listen(8000,()=>{
    console.log("server is working")
});*/