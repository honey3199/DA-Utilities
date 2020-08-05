var sell = require("../model/sell_model");
var express = require("express");
var router = express.Router();
var multer = require("multer");
var path = require("path");
ejs = require('ejs');
var item =require("../model/itemtype_model");
// app.set('view engine', 'ejs'); // code to set the ejs for rendering template

var da="";

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/assets/img/sell_products');
    },
    filename: (req, file, cb) => {
        x = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});
var upload = multer({ storage: storage });

router.get('/',function(req,res,next){
   
    item.getAllItem(function(err,rows){
        if(err){
//            res.json(err);
//            res.render('Sell',{title:"DAIICT-UTILITIES",text:"Request For Session",data:da});
        }
        else{
            da1=JSON.stringify(rows);
//            res.render('Sell',{title:"DAIICT-UTILITIES",text:"Request For Session",data:da});
        }
    });
    sell.getAllSell(function(err,rows){
        if(err){
            res.json(err);
            res.render('Sell',{title:"DAIICT-UTILITIES",text:"Request For Session",data:da,data1:da1});
        }
        else{
            da=JSON.stringify(rows);
            res.render('Sell',{title:"DAIICT-UTILITIES",text:"Request For Session",data:da,data1:da1});
        }
    });

});
router.get('/:id?', function (req, res, next) {

    if (req.params.id) {
        
        sell.getSellById(req.params.id, function (err, rows) {
            if (err) {
                res.json(err);
                res.render('myproduct',{title:"DAIICT-UTILITIES",text:"Request For Session",data:da});
            }
            else {
                
                da=JSON.stringify(rows);
                res.render('myproduct',{title:"DAIICT-UTILITIES",text:"Request For Session",data:da});
            }
        });
    }
    else {
        sell.getAllSell(function (err, rows) {
            if (err) {
                res.json(err);
            }
            else {
                res.json(rows);
            }
        });
    }
});

router.post("", upload.single('itemImage'), function (req, res, next) {
    
    sell.addSell(req.body, req.file.filename, function (err, rows) {
        if (err) {
//            res.json(err);
            res.redirect("/");
        } else {
//            res.json(rows);
            res.redirect("/sell");
        }
    });
});

router.put("/:id", upload.single('itemImage'), function (req, res, next) {
    sell.updateSell(req.params.id, req.body, req.file.filename, function (err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

router.delete("/:id", function (req, res, next) {
    console.log("delete bhavesh.....................................");
    sell.deleteSell(req.params.id, function (err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

module.exports = router;