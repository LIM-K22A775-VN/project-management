module.exports.index = async (req, res) => {

    //SocketIo
    _io.on('connection', (socket) => {
        console.log('a user connected', socket.id);
    });
    //SocketIo

    res.render("client/pages/chat/index", {
        pageTitle: "Chat"
    })
}