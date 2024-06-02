const mongoose =  require('mongoose')
const DatabaseSchema = mongoose.Schema({
    email:{type:String,unique:true,required:true ,lowercase:true},
    otp:{type:String,required:true}
},{timestamps:true,versionKey:false})

const UserModel = mongoose.model('users' , DatabaseSchema)

module.exports=UserModel