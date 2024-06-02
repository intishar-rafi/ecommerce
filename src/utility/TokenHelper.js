const jwt = require('jsonwebtoken');

exports.EncodeToken = (email,user_id)=>{
    const key = '123-ABC-xzy';
    const options = { expiresIn: '24h' };
    const payload = { email: email, user_id: user_id };

    console.log(user_id);
    return jwt.sign(payload, key, options);
}

exports.DecodeToken = (token)=>{
    try{
        let Key = '123-ABC-xzy'

        return jwt.verify(token,Key)

    }catch(e){
        return null
    }
}