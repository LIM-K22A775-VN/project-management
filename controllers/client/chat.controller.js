const Chat = require("../../models/chat.model");
const User = require("../../models/user.model");

module.exports.index = async (req, res) => {
    const userId = res.locals.user.id;
    const fullName = res.locals.user.fullName;
    //SocketIo
    // on : cứ mỗi lần load thì lại vào
    //once : load nhiều lần vẫn chỉ vào once 1 lần
    _io.once('connection', (socket) => {
        socket.on("CLIENT_SEND_MESSAGE", async (content) => {
            // Lưu vào db 
            const chat = new Chat({
                user_id: userId,
                content: content
            });
            await chat.save();


            // trả data về cho client
            _io.emit("SEVER_RETURN_MESSAGE", {
                userId: userId,
                fullName: fullName,
                content: content
            });

        });

    });
    //End SocketIo
    // lấy data từ database
    const chats = await Chat.find({
        deleted: false
    });

    for (const chat of chats) {
        const infoUser = await User.findOne({
            _id: chat.user_id
        }).select("fullName"); // lấy ra full Name
        chat.infoUser = infoUser;
    }
    // console.log(chats);
    // End lấy data từ database
    res.render("client/pages/chat/index", {
        pageTitle: "Chat",
        chats: chats
    })
}