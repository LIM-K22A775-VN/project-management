const nodemailer = require('nodemailer');

module.exports.sendMail = (emailTo,subject, html) => {
    
    // Tạo transporter (cấu hình gửi mail)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // Email người gửi
            pass: process.env.EMAIL_PASSWORD // Mật khẩu ứng dụng (App password) -. tí bỏ vào ENV
        }
    });

    // Cấu hình nội dung email
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: emailTo, // email người nhận
        subject: subject, // tiêu đề muốn gửi
        // text: 'Email content' 
        html : html
    };

    // Gửi email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Lỗi khi gửi email:', error);
        } else {
            console.log('Email đã được gửi thành công:', info.response);
        }
    });

}