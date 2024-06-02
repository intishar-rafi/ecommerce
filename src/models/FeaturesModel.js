const mongoose =  require('mongoose')
const DatabaseSchema = mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    img:{type:String,required:true},

},{timestamps:true,versionKey:false})

const FeaturesModel = mongoose.model('features' , DatabaseSchema)

module.exports=FeaturesModel