const mongoose =  require('mongoose')
const DatabaseSchema = mongoose.Schema({
    des:{type:String,required:true},
    rating:{type:String,required:true},
    productId:{type:mongoose.Schema.Types.ObjectId,required:true},
    userId:{type:mongoose.Schema.Types.ObjectId,required:true},
},{timestamps:true,versionKey:false})

const ReviewModel = mongoose.model('Reviews' , DatabaseSchema)

module.exports=ReviewModel