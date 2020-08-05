var signup=require("../model/user_model");
var express = require("express");
var router = express.Router();
var response = require('../controller/response');
router.post('/',function(req,res,next){
    signup.userSignup(req.body,function(err,rows){
        if (err) {
            res.send(response('Error', 403, null, err, 'Signup Un-Successfull', null))
          } else {
            res.send(response('Success', 200, true, null, 'Signup Successfull', null))
          }
    });
});

module.exports=router;