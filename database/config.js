const mongoose = require('mongoose');

const dbConnection= async()=>{
    try{
        mongoose.set("strictQuery", false);
       await mongoose.connect(process.env.DB_CONNECTION);
        console.log("DB conection");
    }catch (error){
        throw new Error("Error a la hora de conectar la base de datos");
    }
}
module.exports={
    dbConnection
}