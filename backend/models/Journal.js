const mongoose=require("mongoose");
 
const journalSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    entry:{
        type:String,
        required:true,
    },

    mood:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
});

module.exports=mongoose.model("Journal",journalSchema);