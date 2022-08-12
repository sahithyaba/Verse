var express = require('express');
var bodyparser=require('body-parser');
const { default: mongoose } = require('mongoose');

const app=express()

app.use(express.static('public'))
app.use(bodyparser.urlencoded({
    extended:true
}))


var qs;

app.post("/Login", (req,res)=>{

    
    var Email_Id=req.body.Email;
    var Password=req.body.Password;

    mongoose.connect('mongodb://localhost:27017/verse');

    var db=mongoose.connection;

        db.collection('user').findOne({$and:[{$or:[{"Email_Id":Email_Id},{"Username":Email_Id}]},{'Password':Password}]}, (err,res) => {
        if(err) throw err;
        if(res) console.log("user found");
        else console.log('user not found');
    });

      
}).listen(7000);
console.log("Server started") ;