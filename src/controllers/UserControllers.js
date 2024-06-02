const { UserOtpService, UserVerifyOtpService, SaveProfileService, UserProfileReadService } = require("../services/UserServices")

exports.UserLogin=async(req,res)=>{
    let result  = await UserOtpService(req)
    return res.status(200).json(result)
 
}
exports.UserVerify=async(req,res)=>{
    let result  = await UserVerifyOtpService(req,res)

    if(result['status']==='success'){

        //cookie option 
        let cookieOption = {expires:new Date(Date.now()+24*60*60*1000), httpOnly:false}

        // set cookie 

        res.cookie('token',result['token'],cookieOption)

        return res.status(200).json(result)
    }else{
        return res.status(200).json(result)
    }
 
}
exports.UserLogOut=(req,res)=>{
            //cookie option 
            let cookieOption = {expires:new Date(Date.now()-24*60*60*1000), httpOnly:false}

        // set cookie 

        res.cookie('token',"",cookieOption)
        return res.status(200).json({status:'success'})
 
}

exports.CreateProfile=async(req,res)=>{
    let result  = await SaveProfileService(req)
    return res.status(200).json(result)
 
}
exports.UpdateProfile=async(req,res)=>{
    let result  = await SaveProfileService(req)
    return res.status(200).json(result)
 
}
exports.UserProfileRead =async(req,res)=>{
    let result  = await UserProfileReadService(req)
    return res.status(200).json(result)

}