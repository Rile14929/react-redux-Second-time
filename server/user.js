const express = require('express')
// md5加密
const utils = require('utility')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')

const _filter = {'pwd':0,'__v':0}

Router.get('/list',function(req,res){
    User.find({},function(err,doc){
        return res.json(doc)
    })
})

Router.post('/update',function(req,res){
    const userid = req.cookies.userid
	if (!userid) {
            return json.dumps({code:1})
        }
    const body = req.body
    // 查找并且修改数据
	User.findByIdAndUpdate(userid,body,function(err,doc){
		const data = Object.assign({},{
			user:doc.user,
			type:doc.type
		},body)
		return res.json({code:0,data})
	})

})

Router.post('/login',function(req,res){
    // console.log(req.body)
    const {user,pwd}=req.body
    User.findOne({user:user,pwd:Md5Pwd(pwd)},{'pwd':0},function(err,doc){
        if(!doc){
            return res.json({code:1,msg:'用户名不存在或者密码错误'})
        }
        res.cookie('userid',doc._id)
        return res.json({code:0,data:doc})
    })
})
Router.post('/register',function(req,res){
    // console.log(req.body)
    const {user,pwd,type}=req.body
    User.findOne({user:user},function(err,doc){
        if(doc){
            return res.json({code:1,msg:'用户名已存在'})
        }
        const userModel = new User({user,type,pwd:Md5Pwd(pwd)})
        userModel.save(function(e,d){
            if(e){
                return res.json({code:1,msg:"出错了"})
            }
            const {user,type,_id} = d
            res.cookie('userid',_id)
            return res.json({code:0,data:{user,type,_id}})
        })
    })
})

function Md5Pwd(pwd){
    return utils.md5(utils.md5(pwd+'!@#$%%react+redux'))
}

Router.get('/info',function(req,res){
    const {userid} = req.cookies
    if(!userid){
        return res.json({code:1})
    }
    User.findOne({_id:userid},_filter,function(err,doc){
        if(err){
            return res.json({code:1,msg:'出错啦'})
        }
        if(doc){
            return res.json({code:0,data:doc})
        }
    })
    

})

module.exports = Router