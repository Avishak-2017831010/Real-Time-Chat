const path=require('path')
const express=require('express')
const http=require('http')
const socket=require('socket.io')
const msgformat=require('./additionals/messages')
const { userJoin } = require('./additionals/usersection')

const app=express()
const server=http.createServer(app)
const conn=socket(server)

const PORT=process.env.PORT||3000
const bot='Chit-Bit'

conn.on('connection',socket=>{
    
    socket.emit('message',msgformat(bot,"Welcome to Chit-Chat"))

    socket.on('joinroom',({username,room})=>{

        const userInfo=userJoin(socket.id,username,room)

        socket.broadcast.emit('message',msgformat(bot,"A user got connected"))

    //When a user disconnects
    socket.on('disconnect',()=>{
        conn.emit('message',msgformat(bot,"A user just left"))
    })

    //Receives the message

    socket.on('chatMsg',(msg)=>{
        conn.emit('message',msgformat('User',msg))

    })
    })
   

    //When a user connects
    

})

app.use(express.static(__dirname+'/public'))

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/Login.html')
})



server.listen(PORT,()=>console.log(`Server Running on ${PORT}`))