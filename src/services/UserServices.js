const ProfilesModel = require("../models/ProfileModel")
const UserModel = require("../models/UsersModel")
const EmailSend = require("../utility/EmailHelper")
const { EncodeToken } = require("../utility/TokenHelper")

const UserOtpService = async(req)=>{
    try{
        let email = req.params.email
        let code = Math.floor(100000+Math.random()*900000)
        let EmailText = ` Your verification code=${code}`
        let EmailSubject = " Your verification code"
        
        await EmailSend(email,EmailText,EmailSubject)
        await UserModel.updateOne({email:email}, {$set:{otp:code}} , {upsert:true})
        return {status:'success' , message:'6 digit otp send '}
    }catch(e){
        return {status:'fail' , message:'otp send fail '}

    }

}
const UserVerifyOtpService = async(req)=>{
    const email = req.params.email;
    const otp = req.params.otp;

    try{
        const user = await UserModel.findOne({ email: email, otp: otp });

        if(user){
            // user _id read
            
            //create user Token encodeToken
            const token = EncodeToken(email, user._id.toString());

            // OTP code update 
            await UserModel.updateOne({email:email}, {$set:{otp:"0"}})

            return  {status:'success',message:'valid OTP', token:token}

        }else{
            return {status:'fail' , message:'invalid OTP'}
        }
    }catch(e){
        return {status:'fail' , message:'invalid OTP'}

    }
    
}

const SaveProfileService = async(req)=>{
    try{
        let user_id = req.headers.user_id
        let reqBody = req.body
        reqBody.userId = user_id
        await ProfilesModel.updateOne({userId:user_id}, {$set:reqBody}, {upsert:true})
        return  {status:'success',message:'profile successfully created'}
    }catch(e){
        return {status:'fail' , message:e}

    }
}

const UserProfileReadService = async(req)=>{
    try{
        let user_id = req.headers.user_id
        let result = await ProfilesModel.find({userId:user_id})
        return {status:'success', data:result}
    }catch(e){
        return {status:'bad request' , message:'404 not found data'}
    }

}


module.exports ={
    UserOtpService,UserVerifyOtpService,
    SaveProfileService,
    UserProfileReadService
}