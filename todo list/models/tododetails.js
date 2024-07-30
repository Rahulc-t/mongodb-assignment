const {Schema}=require("mongoose")
const {model}=require("mongoose")

const sample=new Schema({
    task:{type:String,required:true}
});

const samples=model('tasks',sample);
module.exports=samples;