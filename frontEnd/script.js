const socket = io();

let username;

const textarea=document.querySelector('#textAreaId')
const msgarea=document.querySelector('.messageSection')

while(!username){
    username=prompt("Enter Your Name");
}

textarea.addEventListener('keyup',(event)=>{
    if(event.key==='Enter'){
        sendMessage(event.target.value)
        event.target.value=""
    }
   
})

const sendMessage=(msg)=>{
    let usermsg = {
        user: username,
        message:msg.trim()
    }

    appendMessage(usermsg,'outgoing')
    scrolltoBottom()

    socket.emit('message',usermsg)
}

const appendMessage =(usermsg,type)=>{
    let mainDiv=document.createElement('div')
    let className=type
    mainDiv.classList.add(className,'message')

    let messageInfo=`
        <h6>${usermsg.user}</h6>
        <p>${usermsg.message}</p>

    `

    mainDiv.innerHTML=messageInfo
    msgarea.appendChild(mainDiv)
    scrolltoBottom()

}

socket.on('message',(usermsg)=>{
    appendMessage(usermsg,'incoming')
})

const scrolltoBottom=()=>{
    msgarea.scrollTop=msgarea.scrollHeight
}