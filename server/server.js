const express = require('express')
const cookieParse = require('cookie-parser')
const userRouter= require('./user')
// 解析post过来的json数据
const bodyParser = require('body-parser')
// 解析cookie
const app = express()

const server = require('http').Server(app)
const io = require('socket.io')(server)
const model = require('./model')
const Chat = model.getModel('chat')
// Chat.remove({},function(){})
io.on('connection',function(socket){
    socket.on('sendmsg',function(data){
        const {from,to,msg} = data
        const chatid = [from,to].sort().join('_')
        Chat.create({chatid,from,to,content:msg},function(err,doc){
            io.emit('recvmsg',Object.assign({},doc._doc))
        })
    })
})

app.use(cookieParse())
app.use(bodyParser.json())
app.use('/user',userRouter)
server.listen(9093,function(){
    console.log('yes')
})