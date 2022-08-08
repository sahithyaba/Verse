var querystring=require('querystring');
var express = require('express');
const { default: mongoose } = require('mongoose');

const app=express()

app.use(express.static('public'))


var qs;

app.post("/registration", (req,res)=>{

    var datal= "";

    req.on('data', function (chunk) {

    console.log(chunk); 

    datal += chunk;

    console.log("Data in String format: "+datal);
});

req.on('end', function () {

    qs=querystring.parse(datal); 
 
    console.log(qs);

    var Email_Id=qs['Email Id'];
    var Username=qs['Username'];
    var Name=qs['Name'];
    var DOB=qs['Date of Birth'];
    var ph_number=qs['Phone Number'];
    var License_Number=qs['Driving License Number'];
    var Password=qs['Password'];

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

    db.collection('user').insertOne(data,(err,col) =>{
        if(err) throw err;
        else {console.log("inserted successfully");}
    })

    return res.redirect('/login.html');
})
}).listen(8000);


console.log("Server started") ;