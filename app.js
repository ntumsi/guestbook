let http = require("http");
let path = require("path");
let express = require("express");
let logger = require("morgan");
let bodyparser = require("body-parser");
const bodyParser = require("body-parser");

let app = express();

app.set("views", path.resolve(__dirname, "views"));

app.set("view engine", "ejs");
let entries = []

app.locals.entries = entries;

app.use(logger("dev"));
app.use(bodyParser.urlencoded({extended:false}))

app.get("/", function(request, response){
    response.render("index");
})
app.get("/new-entry", function(request, response){
    response.render("new-entry");
})
app.post("/new-entry", function(request, response){
    if(!request.body.title || !request.body.body){
        response.status(400).send("Entries must have a title and a body");
        return;
    }
  entries.push({
        title: request.body.title,
        body: request.body.body,
        published: new Date()
    })
    console.log(entries);
    response.redirect("/");
})

app.use(function(request, response){
    response.status(404).render("404");
})
http.createServer(app).listen(3000, function(){
    console.log("Guestbook app started on port 3000")
})
