const express = require('../lib/express');
const app = express();
// app.get('/',function(req,res,next){
//     console.log(1);
//     next();
// },function(req,res,next){
//     console.log(11);
//     next();
// }).get('/',function(req,res,next){
//     console.log(2);
//     next();
// }).get('/',function(req,res,next){
//     console.log(3);
//     res.end('ok');
// }).get('/',function(err,req,res,next){
//     res.end('catch: '+err);
// });
app.get('/',function(req,res,next){
    console.log(1);
    next();
})
app.get('/2',function(req,res,next){
    console.log(2);
    next();
})
app.get('/',function(req,res,next){
    console.log(3);
    res.end('ok');
})
app.listen(3000,function(){
    console.log('server started on port 3000');
});