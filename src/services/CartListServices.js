const { default: mongoose } = require("mongoose")
const CartModel = require("../models/ProductCartModel")
const ObjectID = mongoose.Types.ObjectId

const CartListService =async(req)=>{
    try{
        let user_id = new ObjectID(req.headers.user_id)
        let matchStage = {$match:{userId:user_id}}
        let joinStageProduct = {$lookup:{from:'products', localField:'productId' , foreignField:"_id",as:'product'}}
        let joinStageBrands = {$lookup:{from:'brands', localField:'product.brandID' , foreignField:"_id",as:'brands'}}
        let joinStageCategory = {$lookup:{from:'categories', localField:'product.categoryID' , foreignField:"_id",as:'categories'}}
        let joinUnwindProduct = {$unwind:'$product'}
        let joinUnwindBrands = {$unwind:'$brands'}
        let joinUnwindCategories = {$unwind:'$categories'}

        let projectionStage = {$project:{
            '_id':0,'userId':0,'productId':0,'createdAt':0,'updatedAt':0,'product._id':0,'brands._id':0,'categories._id':0,
            'product.categoryID':0, 'product.brandID':0
        }}


        let data = await CartModel.aggregate([
            matchStage,
            joinStageProduct,
            joinStageBrands,
            joinStageCategory,
            joinUnwindProduct,
            joinUnwindBrands,
            joinUnwindCategories,
            projectionStage
        ])
        return {status:'success', data:data}
    }catch(e){
        return {status:'fail' , message:'wishlist not found data'}

    }
}

const SaveCartListService =async(req)=>{
    try{
        let user_id = req.headers.user_id
        let reqBody = req.body 
        reqBody.userId = user_id
        await CartModel.create(reqBody)
        return {status:'success' , message:'successfully cart create '}
    }catch(e){
        return {status:'fail' , message:'cart not found data '}

    }
}
const UpdateCartListService =async(req)=>{
    try{
        let user_id = req.headers.user_id
        let cartID = req.params.cartID
        let reqBody = req.body 
        await CartModel.updateOne({_id:cartID, userId:user_id} , {$set:reqBody})
        return {status:'success' , message:'successfully cart list update '}
    }catch(e){
        return {status:'fail' , message:'cart update not found data '}


    }
}
const RemoveCartListService =async(req)=>{
    try{
        let user_id = req.headers.user_id
        let reqBody = req.body 
        reqBody.userId = user_id
        await CartModel.deleteOne(reqBody)
        return {status:'success' , message:'successfully cart delete '}
    }catch(e){
        return {status:'fail' , message:'delete not found data '}
    }
}



module.exports= {CartListService,SaveCartListService,UpdateCartListService,RemoveCartListService}