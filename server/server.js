const express = require('express')

// 解析post过来的json数据
const bodyParser = require('body-parser')
// 解析cookie
const cookieParse = require('cookie-parser')
const userRouter= require('./user')

const app = express()
app.use(cookieParse())
app.use(bodyParser.json())
app.use('/user',userRouter)
app.listen(9093,function(){
    console.log('yes')
})