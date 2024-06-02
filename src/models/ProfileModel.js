const mongoose =  require('mongoose')
const DatabaseSchema = mongoose.Schema({
     cus_name:{type:String},
     cus_add:{type:String},
     cus_city:{type:String},
     cus_state:{type:String},
     cus_postCode:{type:String},
     cus_country:{type:String},
     cus_phone:{type:String},
     cus_fex:{type:String},
     ship_name:{type:String},
     ship_add:{type:String},
     ship_city:{type:String},
     ship_state:{type:String},
     ship_postCode:{type:String},
     ship_country:{type:String},
     ship_phone:{type:String},
    userId:{type:mongoose.Schema.Types.ObjectId,required:true},
},{timestamps:true,versionKey:false})

const ProfilesModel = mongoose.model('profiles' , DatabaseSchema)

module.exports=ProfilesModel