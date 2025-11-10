//CLIENT_SEND_MESSAGE
const formSendData = document.querySelector(".inner-foot .inner-form");
if (formSendData) {
    formSendData.addEventListener("submit", (e) => {
        e.preventDefault();
        const content = e.target.elements.content.value;
        if (content) {
            socket.emit("CLIENT_SEND_MESSAGE", content);
            e.target.elements.content.value = "";
        }
    });
}
//END CLIENT_SEND_MESSAGE


// SEVER_RETURN_MESSAGE
socket.on("SEVER_RETURN_MESSAGE", (data) => {
    //id của user
    const myId = document.querySelector("[my-id]").getAttribute("my-id");


    const innerBody = document.querySelector(".inner-body");
    // console.log(data);
    const div = document.createElement("div");
    let htmlFullName = "";
    if (data.userId === myId) {
        div.classList.add("inner-outgoing");
    } else {
        htmlFullName = `<div class="inner-name"> ${data.fullName} </div>`;
        div.classList.add("inner-incoming");
    }
    div.innerHTML = `
          ${htmlFullName}
          <div class="inner-content"> ${data.content} </div>
    `;
    innerBody.appendChild(div);
    innerBody.scrollTop = innerBodyChat.scrollHeight;
});
// END SEVER_RETURN_MESSAGE

//Sửa phần scoll cho tin nhắn xuống dưới cùng mỗi lúc load trang
const innerBodyChat = document.querySelector(".inner-body");
if (innerBodyChat) {
    innerBodyChat.scrollTop = innerBodyChat.scrollHeight;
    //scrollTop: cách top bao nhiêu = scrollHeight : chiều cao của toàn bộ tin nhắn scroll
    //
}
//Sửa phần scoll cho tin nhắn xuống dưới cùng mỗi lúc load trang


//  Show emoji-picker Chat
import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js'

//show Popup
const buttonIcon = document.querySelector('.button-icon')
if (buttonIcon) {
    const tooltip = document.querySelector('.tooltip');
    Popper.createPopper(buttonIcon, tooltip);

    buttonIcon.addEventListener("click", () => {
        tooltip.classList.toggle('show')
    });
}
// opacity: 0 -> chú ý khi Imoji không HIỆN
// Biến mất hoàn toàn (vẫn tồn tại trong bố cục, nhưng không thấy được)
// End show Popup

// Insert Icon to Input 
const emojiPicker = document.querySelector('emoji-picker');
if (emojiPicker) {
    // lấy ra ô input
    const inputChat = document.querySelector(".chat .inner-form input[name ='content']");
    emojiPicker.addEventListener('emoji-click',
        (event) => {
            const icon = event.detail.unicode;
            inputChat.value = inputChat.value + icon;
        }
    );

    // Input Key up 
    inputChat.addEventListener("keyup",()=>{
        socket.emit("CLIENT_SEND_TYPING", "show");
    });
    // EndInput Key up 

}
// End Insert Icon to Input 
//  Show emoji-picker Chat



// CLIENT_RETURN_TYPING 
socket.on("CLIENT_RETURN_TYPING",(data)=>{
    console.log(data);
})

// END CLIENT_RETURN_TYPING 






// https://www.npmjs.com/package/emoji-picker-element/v/1.22.4?utm_source=chatgpt.com#usage