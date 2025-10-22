// đây là 1 hàm tạo ra 1 string random
module.exports.generateRandomString = (length)=>{
    const character = "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
    let result = "";
    for (let i = 0; i < length; i++) {
        result+= character.charAt(Math.floor(Math.random()*character.length));
    }
    return result;
}

// npm install uuid
// yarn add nanoid
// const { nanoid } = require('nanoid');
// const id = nanoid();           // mặc định: chuỗi 21 ký tự
// const shortId = nanoid(10);    // bạn có thể chỉnh độ dài tùy ý