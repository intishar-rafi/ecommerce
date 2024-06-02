const BrandModel = require('../models/BrandModel')
const CategoriesModel = require('../models/CategoriesModel')
const ProductSliderModel  =require('../models/ProductSliderModel')
const ProductModel = require('../models/ProductsModel')
const ProductDetailsModel = require('../models/ProductDetailsModel')
const ProductReviewModel = require('../models/ProductReviewModel')
const mongoose = require('mongoose')
const ReviewModel = require('../models/ProductReviewModel')
const ObjectId = mongoose.Types.ObjectId

const BrandListServices =async()=>{
    try{
        let data = await BrandModel.find()
        return {status:'success',data:data}
    }catch(e){
        return {status:'success',data:e}.toString()
    }

}
const CategoryListServices =async()=>{
    try{
        let data = await CategoriesModel.find()
        return {status:'success',data:data}
    }catch(e){
        return {status:'success',data:e}.toString()
    }

}
const SliderListServices =async()=>{
    try{
        let data = await ProductSliderModel.find()
        return {status:'success',data:data}
    }catch(e){
        return {status:'success',data:e}.toString()
    }

}
const ListByBrandServices =async(req)=>{
    try{
        let BrandID = new ObjectId(req.params.BrandID)

        let MatchStage ={$match:{brandID:BrandID}}
        let JoinWithBrandStage={$lookup:{from:'brands', localField:'brandID' , foreignField:'_id' , as:'brand'}}
        let JoinWithCategoryStage = {$lookup:{from:'categories', localField:'categoryID' , foreignField:'_id' , as:'category'}}
        let unWindBrandStage ={$unwind:'$brand'} 
        let unWindCategoryStage ={$unwind:'$category'}
        let projectionStage ={$project:{'brand._id':0,'category._id':0, 'brandID':0,'categoryID':0,'createdAt':0,'updatedAt':0}} 
        let data = await ProductModel.aggregate([
            MatchStage,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            unWindBrandStage,
            unWindCategoryStage,
            projectionStage

        ])
        return {status:'success',data:data}
        
    }catch(e){
        return {status:'success',data:e}.toString()
    }

}
const ListByCategoryServices =async(req)=>{
    try{
        let CategoryID = new ObjectId(req.params.CategoryID)

        let MatchStage = {$match:{categoryID:CategoryID}}
        let JoinWithBrandStage ={$lookup:{from:'brands' , localField:'brandID', foreignField:'_id' ,as:'brand'}}
        let JoinWithCategoriesStage = {$lookup:{from:'categories',localField:'categoryID', foreignField:'_id', as:'category'}}
        let unWindBrandsStage = {$unwind:'$brand'}
        let unWindCategoriesStage ={$unwind:'$category'}
        let projectionStage = {$project:{'brand._id':0,'category._id':0, 'brandID':0,'categoryID':0}}

        let data  = await ProductModel.aggregate([
            MatchStage,
            JoinWithBrandStage,
            JoinWithCategoriesStage,
            unWindBrandsStage,
            unWindCategoriesStage,
            projectionStage
        ])
        return {status:'success',data:data}
    }catch(e){
        return {status:'fail',data:e}.toString()
    }

}
const ListByRemarkServices =async(req)=>{
    try{
        let Remark = req.params.Remark

        let MatchStage = {$match:{remark:Remark}}
        let JoinWithBrandStage ={$lookup:{from:'brands' , localField:'brandID', foreignField:'_id' ,as:'brand'}}
        let JoinWithCategoriesStage = {$lookup:{from:'categories',localField:'categoryID', foreignField:'_id', as:'category'}}
        let unWindBrandsStage = {$unwind:'$brand'}
        let unWindCategoriesStage ={$unwind:'$category'}
        let projectionStage = {$project:{'brand._id':0,'category._id':0, 'brandID':0,'categoryID':0}}

        let data  = await ProductModel.aggregate([
            MatchStage,
            JoinWithBrandStage,
            JoinWithCategoriesStage,
            unWindBrandsStage,
            unWindCategoriesStage,
            projectionStage
        ])
        return {status:'success',data:data}
    }catch(e){
        return {status:'fail',data:e}.toString()
    }

}
const ListBySimilarServices =async(req)=>{
    try{
        let CategoryID = new ObjectId(req.params.CategoryID)

        let MatchStage = {$match:{categoryID:CategoryID}}
        let LimitStage = {$limit:20}
        let JoinWithBrandStage ={$lookup:{from:'brands' , localField:'brandID', foreignField:'_id' ,as:'brand'}}
        let JoinWithCategoriesStage = {$lookup:{from:'categories',localField:'categoryID', foreignField:'_id', as:'category'}}
        let unWindBrandsStage = {$unwind:'$brand'}
        let unWindCategoriesStage ={$unwind:'$category'}
        let projectionStage = {$project:{'brand._id':0,'category._id':0, 'brandID':0,'categoryID':0}}

        let data  = await ProductModel.aggregate([
            MatchStage,
            LimitStage,
            JoinWithBrandStage,
            JoinWithCategoriesStage,
            unWindBrandsStage,
            unWindCategoriesStage,
            projectionStage
        ])
        return {status:'success',data:data}
    }catch(e){
        return {status:'fail',data:e}.toString()
    }

}
const DetailsServices =async(req)=>{
try{
    let ProductID = new ObjectId(req.params.ProductID)
    let MatchStage = {$match:{ _id:ProductID }}
    let JoinWithBrandStage ={$lookup:{from:'brands' , localField:'brandID', foreignField:'_id' ,as:'brand'}}
    let JoinWithCategoriesStage = {$lookup:{from:'categories',localField:'categoryID', foreignField:'_id', as:'category'}}
    let JoinWithDetailsStage = {$lookup:{from:'productsdetails', localField:'_id', foreignField:'productID',as:'details'}}
    let unWindBrandsStage = {$unwind:'$brand'}
    let unWindCategoriesStage ={$unwind:'$category'}
    let unWindDetailsStage = {$unwind:'$details'}
    let projectionStage = {$project:{'brand._id':0,'category._id':0, 'brandID':0,'categoryID':0}}

    let data  = await ProductModel.aggregate([
        MatchStage,
        JoinWithBrandStage,
        JoinWithCategoriesStage,
        JoinWithDetailsStage,
        unWindDetailsStage,
        unWindBrandsStage,
        unWindCategoriesStage,
        projectionStage

    ])
    return {status:'success',data:data}
}catch(e){
    return {status:'fail',data:e}.toString()

}


}
const ListByKeywordServices =async(req)=>{

    try{
        let searchRegex = {"$regex":req.params.Keyword, "$options":"i"}
        let searchParams = [{title:searchRegex},{shortDes:searchRegex}]
        let searchQuery = {$or:searchParams}


        let MatchStage = {$match:searchQuery}
        let JoinWithBrandStage ={$lookup:{from:'brands' , localField:'brandID', foreignField:'_id' ,as:'brand'}}
        let JoinWithCategoriesStage = {$lookup:{from:'categories',localField:'categoryID', foreignField:'_id', as:'category'}}
        let JoinWithDetailsStage = {$lookup:{from:'productsdetails', localField:'_id', foreignField:'productID',as:'details'}}
        let unWindBrandsStage = {$unwind:'$brand'}
        let unWindCategoriesStage ={$unwind:'$category'}
        let unWindDetailsStage = {$unwind:'$details'}
        let projectionStage = {$project:{'brand._id':0,'category._id':0, 'brandID':0,'categoryID':0}}
    
        let data  = await ProductModel.aggregate([
            MatchStage,
            JoinWithBrandStage,
            JoinWithCategoriesStage,
            JoinWithDetailsStage,
            unWindDetailsStage,
            unWindBrandsStage,
            unWindCategoriesStage,
            projectionStage
    
        ])
        return {status:'success',data:data}
    }catch(e){
        return {status:'fail',data:e}.toString()
    
    }


}


const ReviewListServices =async(req)=>{
    let ProductID = new ObjectId(req.params.ProductID)
    let MatchStage = {$match:{productID:ProductID }}
    let JoinWithProfileStage = {$lookup:{from:'profiles', localField:'userID' , foreignField:'userID' ,as:'profile'}}
    let unWindStage = {$unwind:'$profile'}
    let projectionStage  = {$project:{'des':1, 'rating':1,'profile.cus_name':1}}
    let data  = await ReviewModel.aggregate([
        MatchStage,
        JoinWithProfileStage,
        unWindStage,
        projectionStage
    ])
    return {status:'success',data:data}



}
module.exports ={    BrandListServices,CategoryListServices,SliderListServices,ListByBrandServices,ListByCategoryServices,ListBySimilarServices,ListByKeywordServices,ListByRemarkServices,DetailsServices,ReviewListServices}