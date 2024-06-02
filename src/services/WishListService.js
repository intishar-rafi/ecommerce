const { default: mongoose } = require("mongoose")
const WishModel = require("../models/WishModel")
const ObjectID = mongoose.Types.ObjectId

const WishListService =async(req)=>{
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


        let data = await WishModel.aggregate([
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

const SaveWishListService =async(req)=>{
    try{
        let user_id = req.headers.user_id
        let reqBody = req.body
        reqBody.userId = user_id
         await WishModel.updateOne(reqBody,{$set:reqBody} , {upsert:true})
         return {status:'success' , message:'wishlist update data'}
    }catch(e){
        return {status:'fail' , message:'wishlist not found data'}

    }
    
}
const RemoveWishListService =async(req)=>{
    try{
        let user_id = req.headers.user_id
        let reqBody = req.body
        reqBody.userId = user_id
         await WishModel.deleteOne(reqBody)
         return {status:'success' , message:'wishlist delete data'}
    }catch(e){
        return {status:'fail' , message:'wishlist not found data'}

    }
    
}



module.exports = {
    WishListService,
    SaveWishListService,
    RemoveWishListService
}