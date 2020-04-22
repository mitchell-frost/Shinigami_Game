var express        = require("express"),
    mongoose       = require("mongoose"),
    bodyParser     = require("body-parser"),
    methodOverride = require("method-override");
    mongoose       = require("mongoose"),
    path           = require("path");

var app = express();

mongoose.connect("mongodb://localhost/shinigami", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname + '/public')));

app.set("view engine", "ejs");

var RyukSchema = new mongoose.Schema ({
    name: String,
    heaven_height: Number
});
var shinigami = mongoose.model("Shinigami", RyukSchema);

var people =  Math.floor(Math.random()*1000);
var enisya = {name: "Enisya", heaven_height: people};

app.get("/", function(req, res){
    shinigami.create(enisya, function(err, newShinigami){
        if(err){
            console.log(err);
        } 
    });
    console.log(enisya);
    res.render("home", {enisya: enisya});
});

app.get("/decrease", function(req, res){
    res.render("home", {enisya: enisya})
});

app.post("/decrease", function(req, res){
    enisya.heaven_height -= req.body.heaven_height;
    res.render("home", {enisya: enisya});
});

app.listen(3000, process.env.IP, function(){
    console.log("The Shinigami Ryuk has come to earth to feed on you alllll!!!");
});