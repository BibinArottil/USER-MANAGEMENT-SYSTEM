const mongoose = require("mongoose");

//Creating database and connecting database
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/week-6');
mongoose.connection.on("connected",(err)=>{  
    if(err){
        console.log('error'); 
    }
    else{
        console.log("mongodb connected successfuly");
    }
})