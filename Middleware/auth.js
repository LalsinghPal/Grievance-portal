const jwt = require('jsonwebtoken')
const AdminModel = require('../models/Admin')

const checkAdminAuth =async (req, res, next) => {
    //console.log("hello auth")
    const { token } = req.cookies
    //console.log(token)
    if (!token){
        req.flash('error', 'unauthorised user please login')
        res.redirect('/')
    }else{
        const verifyLogin = jwt.verify(token, 'pninfosys@496ghjk')
        //console.log(verifyLogin)
        const data = await AdminModel.findOne({_id:verifyLogin.ID})
       // console.log(data)
       req.data = data



        next(); //next method route pr pahucha dega
    }
}

module.exports = checkAdminAuth