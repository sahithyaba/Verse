var bodyparser=require('body-parser');
var express = require('express');
const { default: mongoose } = require('mongoose');


const app=express()

//app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({
    extended:true
}))

app.post("/registration", (req,res)=>{

    
    var Email_Id=req.body.Email_Id;
    var Username=req.body.Username;
    var Name=req.body.Name;
    var DOB=req.body.Date_of_Birth;
    var ph_number=req.body.Phone_Number;
    var License_Number=req.body.Driving_License_Number;
    var Password=req.body.Password;

    var data={
        'Username': Username,
        'Name' : Name,
        'Email_Id': Email_Id,
        'DOB': DOB,
        'ph_number': ph_number,
        'License_Number': License_Number,
        'Password': Password
    }

    mongoose.connect('mongodb://localhost:27017/verse');

    var db=mongoose.connection;

    db.collection('user').findOne({'Email_Id': Email_Id}, function(err,col){
        if(err) throw err;
        if(col) 
        {
            console.log('account already exist');
            //return res.redirect('/registration');
        }
        else 
        {
            db.collection('user').insertOne(data,(err,col) =>{
                if(err) throw err;
                else {console.log("inserted successfully");}
            })
            //return res.redirect('/login.html');
        }
    });

}).listen(8000);

console.log("Server started") ;