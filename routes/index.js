var express = require('express');
const pool = require('../routes/pool');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.usernumber){
    res.render('index', { title: 'Express',login:'true' });

  }
  else{
    res.render('index', { title: 'Express',login:'false' });

  }
});








router.get('/product',(req,res)=>{
  if(req.session.usernumber){
    res.render('product', { title: 'Express',login:'true' });

  }
  else{
    res.render('product', { title: 'Express',login:'false' });

  }
})




router.get('/mycart',(req,res)=>{
  if(req.session.usernumber){
    pool.query(`insert into cart(bookingid ,quantity , price) values ('ESSENTIAL STRUCTURED BLAZER','1','500')`,(err,result)=>{

      if(err) throw err;
      else {

    pool.query(`select * from cart`,(err,result)=>{
   if(err) throw err;
   else{
    res.render('cart', { title: 'Express',login:'true',result });

   }


    })

      }
    })

  }
  else{
    pool.query(`insert into cart(bookingid ,quantity , price) values ('ESSENTIAL STRUCTURED BLAZER','1','500')`,(err,result)=>{
      if(err) throw err;
      else {
        pool.query(`select * from cart`,(err,result)=>{
          if(err) throw err;
          else{
           res.render('cart', { title: 'Express',login:'true',result });
       
          }
       
       
           })

      }
    })

  }
})



router.get('/delete',(req,res)=>{
  pool.query(`delete from cart where id = '${req.query.id}'`,(err,result)=>{
    if(err) throw err;
    else {
      pool.query(`select * from cart`,(err,result)=>{
        if(err) throw err;
        else{
         res.render('cart', { title: 'Express',login:'true',result });
     
        }
     
     
         })
    }
  })
})



router.get('/checkout',(req,res)=>{
  if(req.session.usernumber){
    res.render('checkout', { title: 'Express',login:'true' });

  }
  else{
    res.render('checkout', { title: 'Express',login:'false' });

  }
})



module.exports = router;
