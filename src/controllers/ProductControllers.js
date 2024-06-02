const { BrandListServices, CategoryListServices, SliderListServices, ListByBrandServices, ListByCategoryServices, ListByRemarkServices, ListBySimilarServices, DetailsServices, ListByKeywordServices, ReviewListServices } = require("../services/ProductServices")

exports.ProductBrandList =async(req,res)=>{
    let result = await BrandListServices()
    return res.status(200).json(result)

}
exports.ProductCategoryList =async(req,res)=>{
    let result  = await CategoryListServices();
    return res.status(200).json(result)
    
}
exports.ProductSliderList =async(req,res)=>{
    let result = await SliderListServices()
    return res.status(200).json(result)
    
}
exports.ProductListByBrand =async(req,res)=>{
    let result = await ListByBrandServices(req)
    return res.status(200).json(result)

    
}
exports.ProductListByCategory =async(req,res)=>{
    let result =  await ListByCategoryServices(req)
    return res.status(200).json(result)
    
}
exports.ProductListByRemark =async(req,res)=>{
    let result  = await ListByRemarkServices(req)
    return res.status(200).json(result)
    
}
exports.ProductListBySimilar =async(req,res)=>{
    let result = await ListBySimilarServices(req)
    return res.status(200).json(result)
    
}
exports.ProductListByKeyword =async(req,res)=>{
    let result = await ListByKeywordServices(req)
    return res.status(200).json(result)
    
    
}

exports.ProductDetails =async(req,res)=>{
    let result = await DetailsServices(req)
    return res.status(200).json(result)

}
exports.ProductReviewList =async(req,res)=>{
    let result =  await ReviewListServices(req)
    return res.status(200).json(result)


}