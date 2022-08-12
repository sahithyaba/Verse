var express = require('express');
var bodyparser=require('body-parser');
const { default: mongoose } = require('mongoose');
var path = require('path');

const app=express()

app.set("view engine", "ejs");
app.use(express.static('public'))
app.use(bodyparser.urlencoded({
    extended:true
}))
app.use(express.static(path.join(__dirname, 'views')));


app.post("/Login", (req,res)=>{

    
    var Email_Id=req.body.Email;
    var Password=req.body.Password;

    mongoose.connect('mongodb://localhost:27017/verse');

    var db=mongoose.connection;

        db.collection('user').findOne({$and:[{$or:[{"Email_Id":Email_Id},{"Username":Email_Id}]},{'Password':Password}]}, (err,res) => {
        if(err) throw err;
        if(res) {
            console.log("user found");
            res.render('index')
        }
        else 
        {
            const msg="incorrect username or password";
            console.log('user not found');
            res.render('login',{msg})
        }
    });

      
}).listen(7000);
console.log("Server started") ;