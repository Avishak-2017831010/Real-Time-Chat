    const socket=io()

    const chatform=document.querySelector('#chat-form')
    const chatMessages=document.querySelector('.chat-messages')

    const {username,room}=Qs.parse(location.search,{
        ignoreQueryPrefix:true
    })



    //User joining a chatroom
    socket.emit('joinroom',{username,room})


    socket.on('message',(msg)=>{
        console.log(msg)
        outputMessage(msg)

        chatMessages.scrollTop=chatMessages.scrollHeight
    })

    const outputMessage=(msg)=>{
        const div=document.createElement('div')
        div.classList.add('message')
        div.innerHTML=`
        <p class="meta">${msg.username}<span id="time">${msg.time}</span></p>
        <p class="text">
            ${msg.text}
        </p>
        `

        document.querySelector('.chat-messages').appendChild(div)
    }

    chatform.addEventListener('submit',(e)=>{
        e.preventDefault()

        
        const msg=e.target.elements.msg.value;

        //message is sent to server
        socket.emit('chatMsg',msg)

        e.target.elements.msg.value=''
        e.target.elements.msg.focus()

    })

