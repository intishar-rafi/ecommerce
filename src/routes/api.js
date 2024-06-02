const express = require('express')
const { ProductBrandList, ProductCategoryList, ProductListByBrand, ProductListByCategory, ProductListBySimilar, ProductListByKeyword, ProductSliderList, ProductListByRemark, ProductDetails, ProductReviewList } = require('../controllers/ProductControllers')
const { UserLogin, UserVerify, UserLogOut, CreateProfile, UpdateProfile, UserProfileRead } = require('../controllers/UserControllers')
const AuthVerification = require('../middlewares/AuthVerification')
const { CreateWishList, RemoveWishList, WishList } = require('../controllers/WishListControllers')
const { SaveCartList, RemoveCartList, CartList, UpdateCartList } = require('../controllers/CartListControllers')
const router = express.Router()

//product api
router.get('/ProductBrandList', ProductBrandList)
router.get('/ProductCategoryList' , ProductCategoryList)
router.get('/ProductSliderList', ProductSliderList)
router.get('/ProductListByBrand/:BrandID', ProductListByBrand)
router.get('/ProductListByCategory/:CategoryID', ProductListByCategory)
router.get('/ProductListBySimilar/:Keyword', ProductListBySimilar)
router.get('/ProductListByKeyword/:Keyword', ProductListByKeyword)
router.get('/ProductListByRemark/:Remark', ProductListByRemark)
router.get('/ProductDetails/:ProductID' , ProductDetails)
router.get('/ProductReviewList/:ProductID', ProductReviewList)

//user profile api 

router.get('/UserLogin/:email', UserLogin)
router.get('/UserVerify/:email/:otp', UserVerify)
router.get('/UserLogOut/', AuthVerification, UserLogOut)
router.post('/CreateProfile/', AuthVerification, CreateProfile)
router.post('/UpdateProfile/', AuthVerification, UpdateProfile)
router.get('/UserProfileRead/', AuthVerification, UserProfileRead)


//user wishList api
router.post('/CreateWishList/', AuthVerification, CreateWishList)
router.post('/RemoveWishList/', AuthVerification, RemoveWishList)
router.get('/WishList/', AuthVerification, WishList)

 
//cartList api
router.post('/SaveCartList/', AuthVerification, SaveCartList)
router.post('/RemoveCartList/', AuthVerification, RemoveCartList)
router.post('/UpdateCartList/:cartID', AuthVerification, UpdateCartList)
router.get('/CartList/', AuthVerification, CartList)





module.exports =router