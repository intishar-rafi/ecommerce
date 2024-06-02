const mongoose =  require('mongoose')
const DatabaseSchema = mongoose.Schema({
    image1:{type:String,required:true },
    image2:{type:String,required:true},
    image3:{type:String,required:true},
    image4:{type:String},
    image5:{type:String},
    image6:{type:String},
    image7:{type:String},
    image8:{type:String},
    des:{type:String,required:true},
    color:{type:String,required:true},
    size:{type:String,required:true},
    productId:{type:mongoose.Schema.Types.ObjectId,required:true},
    brandId:{type:mongoose.Schema.Types.ObjectId,required:true}
},{timestamps:true,versionKey:false})

const ProductsDetailsModel = mongoose.model('productsDetails' , DatabaseSchema)

module.exports=ProductsDetailsModel