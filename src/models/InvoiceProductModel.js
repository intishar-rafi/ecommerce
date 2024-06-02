const mongoose =  require('mongoose')
const DatabaseSchema = mongoose.Schema({
    color:{type:String,required:true},
    size:{type:String,required:true},
    price:{type:String,required:true},
    qty:{type:String,required:true},
    productId:{type:mongoose.Schema.Types.ObjectId,required:true},
    userId:{type:mongoose.Schema.Types.ObjectId,required:true},
    invoiceId:{type:mongoose.Schema.Types.ObjectId,required:true},
},{timestamps:true,versionKey:false})

const InvoiceProductModel = mongoose.model('invoiceProducts' , DatabaseSchema)

module.exports=InvoiceProductModel