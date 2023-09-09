const express = require("express");
const app = express();
const path = require("path")

const {v4:uuidv4} = require("uuid")
const methodOverride = require("method-override") 

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))
// app.use(express.json())
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public")))
const port = 4080;
app.listen(port, () => {
    console.log("app is listening at port ", port)
})

let posts = [
    {
        id: uuidv4(),
        username: "sainigulshan139@gmail.com",
        post: "tell me about yourself"
    },
    {
        id: uuidv4(),
        username: "urnai3714@gmail.com",
        post: "i love coding"

    },
    {
        id: uuidv4(),
        username: "rani80423@gmail.com",
        post: "I love bad boyf who fuck me like crazy "
    },
    {
        id: uuidv4(),
        username: "badmassbaba@gmail.com",
        post: "how are you i am fine whats about you "
    }
];


app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts })
})

app.post("/posts", (req, res) => {
    let { username, post } = req.body;
    let id = uuidv4();
    console.log(req.body)
    posts.push({ id,username, post });
    res.redirect("/posts")

})
app.get("/posts/new", (req, res) => {
    res.render("new.ejs")
})

app.get("/posts/:id", (req, res) => {
    let { id } = req.params
    let post ;
    posts.find((p) => {
       if( p.id === id){
        post = p; 
}})
console.log(post)
res.render("Details.ejs",{post})
})

app.patch("/posts/:id",(req,res)=>{
    let {id } = req.params
    let newContent = req.body.post
    let post ;
    console.log(id)
    posts.find((p) => {
        if( p.id === id){
         post = p; 
 }})
 post.post = newContent;
 console.log(post)
 res.redirect("/posts")
    
})

app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post ;
    console.log(id)
    posts.find((p) => {
        if( p.id === id){
         post = p; 
 }})
 console.log(post)
res.render("edit.ejs",{post})
})

app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
  posts = posts.filter((p)=>id!==p.id)
 res.redirect("/posts")

})

