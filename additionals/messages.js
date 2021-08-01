const moment=require('moment')
const msgformat=(username,text)=>{
    return{
        username,text,
        time:moment().format('h:mm a')
    }
}

module.exports=msgformat