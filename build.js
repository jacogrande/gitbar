// imports
var express = require("express");
var app = express();
var db = require("./db/db.js");
var beats = require("./db/beats.js");
var config = require("./config.js");
var bodyParser = require("body-parser");
var sha1 = require("js-sha1");

var PORT = process.env.PORT || 3000;

  // ********** //
 // middleware //
// ********** //

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname+"/public"));

// beat1 = new beats.Beat("tester1","yo","beat1");
// beat1.addSection("A",0.00,0.30);
// db.addBeat(beat1.toJSON());
// db.comment("jackson","testing",0);
// db.upvoteComment(0,0);
// db.upvoteBars(0,0,0);

  // ********** //
 //  routing   //
// ********** //
app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.get("/beat",function(req,res){
  res.sendFile(__dirname + "/public/bars.html")
});

app.get("/users",function(req,res){
  res.send(db.getUsers());
});

app.get("/beats",function(req,res){
  res.send(db.getBeats());
});

app.get('/ip',function(req,res){
  res.send(request.connection.remoteAddress);
});

app.get("/login",function(req,res){
  res.sendFile(__dirname+"/public/login.html");
});

// adds a comment
app.post("/comment",function(req,res){
  var comment = req.body.comment;
  var author = req.body.author;
  var beat = req.body.beat;
  db.comment(author, comment, beat);
});

app.post("/upvoteBars",function(req,res){
  var sectionId = req.body.sectionId;
  var author = req.body.author;
  var beatId = req.body.beatId;
  if(req.body.downvote){
    db.upvoteBars(beatId, sectionId, author, -1);
  }
  else{
    db.upvoteBars(beatId, sectionId, author, 1);
  }

});

app.listen(PORT,function(){
  console.log("socket to me... ");
});
