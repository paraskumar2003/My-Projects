// require module
require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const md5 = require("md5");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const findOrCreate = require("mongoose-findOrCreate");

//bcrypt handle encrytion and comparison of password
const bcrypt = require("bcrypt");
const saltRounds = 10;

//cookies configuarations
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");


// app configurations
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", 'ejs');
app.listen(3000, () => {
    console.log("Server started at port 3000");
});

const id=[];
const userId = id[0];




//session configuration
app.use(session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

//here start the database
mongoose.connect("mongodb://localhost:27017/secretUser", { useNewUrlParser: true });

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    googleId: String,
    facebookId: String,
    secrets: []
})
userSchema.plugin(passportLocalMongoose, { usernameField: "email" });
userSchema.plugin(findOrCreate);


//model
const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

// ye smjh me nahi aaya theek se
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    })
});

passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/secret",
        userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
    },
    function(accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ googleId: profile.id }, function(err, user) {
            id.push(user._id);
            return cb(err, user);
        });
    }
));
passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: "http://localhost:3000/auth/facebook/secret",
        profileFields: ['id', 'displayName', 'photos', 'email']
    },
    function(accessToken, refreshToken, profile, cb) {
        // console.log(profile);
        User.findOrCreate({ facebookId: profile.id }, function(err, user) {
            id.push(user._id);
            return cb(err, user);
        });
    }
));



// handling requests
app.get("/", (req, res) => {
    res.render("home")
})



//google authentication
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/secret',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/secret');
    });


//facebook authentication
app.get('/auth/facebook',
    passport.authenticate('facebook'));

app.get('/auth/facebook/secret',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/secret');
    });







app.get("/register", (req, res) => {
    res.render("register");
})
app.get("/login", (req, res) => {
    res.render("login");
})
app.get("/logout", (req, res) => {
    req.logout(() => {
        res.redirect("/");
    });
})

app.get("/secret", function(req, res) {
    if (req.isAuthenticated()) {
        User.findOne({_id:id[0]},(err,Secrets)=>{
            if(!err){
                console.log(Secrets.secrets);
                res.render("secret",{SecretsToRender:Secrets.secrets});
            }else{
                console.log(err);
            }
        })
    } else {
        res.redirect("/login");
    }
});
// Custom Sign Up
app.route("/register")
    .post((req, res) => {
        // came from passport local manager
        User.register(new User({ email: req.body.email }), req.body.password, (err, user) => {
            if (err) {
                console.log(err);
                res.redirect("/login");
            } else {
                passport.authenticate("local")(req, res, () => {
                    res.redirect("/secret");
                })
                console.log("added new user");
            }
        })

    })

// login post req
app.post("/login", (req, res) => {
    const user = new User({
            email: req.body.email,
            password: req.body.password
        })
        //here we gonna use req.login method which came from passport method
    req.login(user, (err, found) => {
        if (err) {
            console.log(err);
            res.redirect("/login");
        } else {
            passport.authenticate("local")(req, res, () => {
                res.redirect("/secret");

            })

        }
    })
})

// posting secrets
app.post("/post-secret",(req,res)=>{
    console.log(req.body);
    if(req.body.title !== "" || req.body.content !== ""){
    User.updateOne({_id:id[0]},{$push:{secrets:{title:req.body.title,content:req.body.content}}},(err,user)=>{});
    res.redirect("/secret");
}
})