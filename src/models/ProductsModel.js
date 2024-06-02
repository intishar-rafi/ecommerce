const mongoose =  require('mongoose')
const DatabaseSchema = mongoose.Schema({
    title:{type:String,unique:true,required:true },
    shortDes:{type:String,required:true},
    price:{type:String,required:true},
    discount:{type:Boolean,required:true},
    discountPrice:{type:String,required:true},
    image:{type:String,required:true},
    stock:{type:Boolean,required:true},
    star:{type:String,required:true},
    remark:{type:String,required:true},
    categoryId:{type:mongoose.Schema.Types.ObjectId,required:true},
    brandId:{type:mongoose.Schema.Types.ObjectId,required:true}
},{timestamps:true,versionKey:false})

const ProductsModel = mongoose.model('products' , DatabaseSchema)

module.exports=ProductsModel