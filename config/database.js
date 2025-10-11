const mongoose = require("mongoose");

module.exports.connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
            .then(() => console.log("Kết nối MongoDB thành công"))
            .catch((err) => console.error("Lỗi kết nối:", err));;
        console.log("Connect success");

    } catch (error) {
        console.log("Connect error");
    }
}