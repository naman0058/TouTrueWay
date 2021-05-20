var express = require('express');
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
    res.render('cart', { title: 'Express',login:'true' });

  }
  else{
    res.render('cart', { title: 'Express',login:'false' });

  }
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
