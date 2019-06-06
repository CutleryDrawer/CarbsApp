var mongoClient = require("mongodb").MongoClient;
var url = "mongodb+srv://Max:gismo918@carbsapp-ls1rd.mongodb.net/carbsDB?retryWrites=true";
var express = require("express");
var path = require("path");
var app = express();
var mysql = require("mysql");
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var port = process.env.PORT || 8082;

app.use(express.static("public"));
app.post("/users", urlencodedParser, function(req, res){
    res.send("Thank you the data has been recieved!");
    console.log(req.body.firstname);
    console.log(req.body.lastname);
    console.log(req.body.email);
    console.log(req.body.pass_word);
    console.log(req.body.con_firm);
    mongoClient.connect(url, {useNewUrlParser:true}, function(err, db){
        if(err) throw err;
        console.log("Succesfull connection");
        var database = db.db("carbsDB");

            var obj = {
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                email:req.body.email,
                pass_word:req.body.pass_word,
                con_firm:req.body.con_firm
            };
            database.collection("users").insertOne(obj, function(err, result) {
                if(err) throw err;
                console.group("Data has been added to the database");
            });
    });

});

    //Route for queryin all the food types -
    app.get("/foods", function(req, res){
        var con = mysql.createConnection({
            host: "remotemysql.com",
            user: "bupFWhT8t5",
            password: "HtaOPLrUi5",
            database: "bupFWhT8t5",
            port:3306
            });

            con.query("SELECT * FROM mytable limit 10", function(err, result){
                if(err) throw err;
                res.json(result);

            });
    });

app.get("/",function(req, res)  {
    res.send("Hello, my  server is working.");

    console.log("The server is listening at port 8082" + port);
});

//toute to handle the path (/home)
app.get("/home", function(req, res){
    res.sendFile(path.join(__dirname + "/home.html"));
});

//route to handle the path (/food)

app.get("/food", function(req, res){
    res.sendFile(path.join(__dirname + "/food.html"));});

//route to hanfle the path(/login)

app.get("/login", function(req, res) {
    res.sendFile(path.join(__dirname + "/login.html"));
});

//route to handle the path (/register)
app.get("/register", function(req, res){
    res.sendFile(path.join(__dirname + "/register.html"));
});


app.listen(port);