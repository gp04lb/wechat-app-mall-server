const mongoose = require('../mongoose')
const User = mongoose.model('User')

exports.admin = (req, res, next)=>{ //验证管理员权限
    // console.log(req.body)
    return next()
}

exports.user = (req, res, next)=>{ //验证用户是否登录
    const {openid} = req.body||req.query
    User.findOneAsync({ //查询数据库是否有该用户
        openid:openid,
    })
    .then(result => {
        if (result) {
            next()
        } else {
            return res.json({
                code: -400,
                message: '登录验证失败',
                data: ''
            })
        }
    })
    .catch(err => {
        res.json({
            code: -200,
            message: err.toString(),
        })
    })
}