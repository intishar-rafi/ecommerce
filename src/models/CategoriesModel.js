const mongoose =  require('mongoose')
const DatabaseSchema = mongoose.Schema({
    categoryName:{type:String,unique:true,required:true },
    categoryImage:{type:String,required:true}
},{timestamps:true,versionKey:false})

const CategoriesModel = mongoose.model('categories' , DatabaseSchema)

module.exports=CategoriesModel