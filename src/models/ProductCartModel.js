const mongoose =  require('mongoose')
const DatabaseSchema = mongoose.Schema({
    color:{type:String,required:true},
    size:{type:String,required:true},
    qty:{type:String,required:true},
    productId:{type:mongoose.Schema.Types.ObjectId,required:true},
    userId:{type:mongoose.Schema.Types.ObjectId,required:true},
},{timestamps:true,versionKey:false})

const CartModel = mongoose.model('carts' , DatabaseSchema)

module.exports=CartModel