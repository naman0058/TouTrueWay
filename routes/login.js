var express = require('express');
var router = express.Router();
var pool =  require('./pool');


router.get('/',(req,res)=>{
  res.render('login',{msg : ''})

})



router.post('/verification',(req,res)=>{
    let body = req.body
    body['number'] = 91+req.body.number
    //   console.log(req.body)

pool.query(`select * from user where number = '${req.body.number}'`,(err,result)=>{
  if(err) throw err;
  else if(result[0]) {
    req.session.numberverify = 91+req.body.number
    var otp =   Math.floor(100000 + Math.random() * 9000);
    req.session.reqotp = otp;
    console.log("Request Number",req.session.numberverify);
    console.log("OTP",otp);
    
    res.render('otp',{msg : otp , anothermsg:''})

  }
  else {
    res.render('login',{msg : '* Mobile Number Not Exists'})
  }
})


   
     
    
   })




router.post('/add-user',(req,res)=>{
  req.session.numberverify = 91+req.body.number
  req.session.name = req.body.name
  var otp =   Math.floor(100000 + Math.random() * 9000);
  req.session.reqotp = otp;
  console.log("Request Number",req.session.numberverify);
  console.log("OTP",otp);
 
  res.render('otp',{msg : otp , anothermsg:''})

})



router.post('/new-user',(req,res)=>{
  let body = req.body;
  if(req.body.otp == req.session.reqotp){
    body['name'] = req.session.name
    body['number'] = req.session.numberverify

pool.query(`insert into user set ?`,body,(err,result)=>{
  if(err) throw err;
  else {
    req.session.usernumber = req.session.numberverify
    res.redirect('/')
  }
})

  }
  else{
    var otp =   Math.floor(100000 + Math.random() * 9000);
  req.session.reqotp = otp;
  res.render('otp',{msg : otp , anothermsg : 'Invalid Otp'})
    
  }
})


module.exports = router;
