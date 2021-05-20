var express = require('express');
var router = express.Router();
var pool =  require('../pool');
var upload = require('../multer');



var table = 'admin'


router.get('/',(req,res)=>{
    console.log(req.session.vendornumber)
    if(req.session.vendornumber){
       pool.query(`select * from vendor where number = '${req.session.vendornumber}'`,(err,result)=>{
           if(err) throw err;
           else if(result[0].status == 'pending'){
               res.render('Vendor/kyc',{business_name:result[0].business_name , number : result[0].number})
           }
           else if(result[0].status=='rejected'){

           }
           else {

           }
       })
   }
    else{
        res.render('vendor-registeration',{msg : '* Invalid Credentials'})

    }
})



router.get('/store-listing/:name',(req,res)=>{
    if(req.session.adminid){
    res.render('Admin/'+req.params.name)
    }
    else {
        res.render('Admin/login',{msg : '* Invalid Credentials'})

    }
})




router.post('/kyc_details',upload.fields([{ name: 'pan_front_image', maxCount: 1 }, { name: 'pan_back_image', maxCount: 1 } , { name: 'aadhar_front_image', maxCount: 1 }, { name: 'aadhar_back_image', maxCount: 1 }]),(req,res)=>{
    let body = req.body
 
    console.log(req.files)

    body['pan_front_image'] = req.files.pan_front_image[0].filename;
    body['pan_back_image'] = req.files.pan_back_image[0].filename;
    body['aadhar_front_image'] = req.files.aadhar_front_image[0].filename;
    body['aadhar_back_image'] = req.files.aadhar_back_image[0].filename;


 console.log(req.body)
   pool.query(`update vendor set ? where number = ?`,[req.body,req.body.number],(err,result)=>{
       err ? console.log(err) : res.redirect('/vendor-dashboard')
   })

   
})








module.exports = router;
