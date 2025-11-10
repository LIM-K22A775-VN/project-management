
//CLIENT_SEND_MESSAGE
const formSendData = document.querySelector(".inner-foot .inner-form");
if(formSendData){
    formSendData.addEventListener("submit",(e)=>{
        e.preventDefault();
        const content = e.target.elements.content.value;
        if(content){
            socket.emit("CLIENT_SEND_MESSAGE",content);
            e.target.elements.content.value = "";
        }
    });
}
//END CLIENT_SEND_MESSAGE


// SEVER_RETURN_MESSAGE
socket.on("SEVER_RETURN_MESSAGE", (data)=>{
    //id của user
    const myId =  document.querySelector("[my-id]").getAttribute("my-id");


    const innerBody = document.querySelector(".inner-body");
    // console.log(data);
    const div = document.createElement("div");
    let htmlFullName ="";
    if(data.userId === myId){
        div.classList.add("inner-outgoing");
    }else{
        htmlFullName = `<div class="inner-name"> ${data.fullName} </div>`;
        div.classList.add("inner-incoming");
    }
    div.innerHTML =`
          ${htmlFullName}
          <div class="inner-content"> ${data.content} </div>
    `;
    innerBody.appendChild(div);
    innerBody.scrollTop = innerBodyChat.scrollHeight ;
});
// END SEVER_RETURN_MESSAGE

//Sửa phần scoll cho tin nhắn xuống dưới cùng mỗi lúc load trang
const innerBodyChat = document.querySelector(".inner-body");
if(innerBodyChat){
    innerBodyChat.scrollTop = innerBodyChat.scrollHeight ;
     //scrollTop: cách top bao nhiêu = scrollHeight : chiều cao của toàn bộ tin nhắn scroll
     //
}
//Sửa phần scoll cho tin nhắn xuống dưới cùng mỗi lúc load trang