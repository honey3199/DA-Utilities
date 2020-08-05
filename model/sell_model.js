var db=require('../dbconnection');
var sell={
    getAllSell:function(callback){
        return db.query("select * from sellmaster",callback);
    },
    addSell:function(item,filename,callback){
        console.log("name==="+filename);
        var date=new Date();
        return db.query("insert into sellmaster(emailId,itemId,itemName,itemPrice,itemDetails,itemImage,itemStatus,sellDate,updatedAt)  values (?,?,?,?,?,?,?,?,?)",[item.emailId,item.itemId,item.itemName,item.itemPrice,item.itemDetails,filename,1,date,date],callback);
    },
    updateSell:function(id,item,filename,callback){
        var date=new Date();
        return db.query("update sellmaster set itemId=?,itemName=?,itemPrice=?,itemDetails=?,itemImage=?,itemStatus=?,updatedAt=? where itemId=?",[item.itemId,itemName,itemPrice,itemDetails,filename,item.itemStatus,date,id],callback);
    },
    getSellById:function(id,callback){
        return db.query("select * from sellmaster where emailId=?",[id],callback);
    },
    deleteSell(id,callback){
        return db.query("delete from sellmaster where sellId=?",[id],callback);
    }   
}
module.exports=sell;