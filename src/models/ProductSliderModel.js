const mongoose =  require('mongoose')
const DatabaseSchema = mongoose.Schema({
    title:{type:String,required:true },
    des:{type:String,required:true},
    price:{type:String,required:true},
    image:{type:String,required:true},
    productId:{type:mongoose.Schema.Types.ObjectId,required:true},
    brandId:{type:mongoose.Schema.Types.ObjectId,required:true}
},{timestamps:true,versionKey:false})

const ProductSlide = mongoose.model('productsSlider' , DatabaseSchema)

module.exports=ProductSlide