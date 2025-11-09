const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    user_id: String,
    room_chat_id:String, // id phòng chát
    content : String,  // nội dung tin nhắn
    images: Array,
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
}, {
    timestamps: true
});
const  ChatModel  = mongoose.model('ChatModel', chatSchema, "chats");

module.exports = ChatModel;