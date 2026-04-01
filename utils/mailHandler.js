let nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    secure: false,
    auth: {
        user: 'b6a49cb32a0760',
        pass: '5862d2216ea41a'
    }
})

module.exports = {
    sendPasswordEmail: async function (toEmail, username, password) {
        let mailOptions = {
            from: 'noreply@nnptud-s4.com',
            to: toEmail,
            subject: 'Thông tin tài khoản của bạn',
            html: `
                <h2>Chào ${username},</h2>
                <p>Tài khoản của bạn đã được tạo thành công.</p>
                <p><strong>Username:</strong> ${username}</p>
                <p><strong>Password:</strong> ${password}</p>
                <p>Vui lòng đổi mật khẩu sau khi đăng nhập lần đầu.</p>
            `
        }
        let result = await transporter.sendMail(mailOptions)
        return result
    }
}
