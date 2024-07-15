const nodemailer = require('nodemailer')


const sendMailToUser = (to, subject, body) => {

    const transport = nodemailer.createTransport({
        service: 'Gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
        }
    })


    const mailOptions = {

        from: "Binni Developer <binnideveloper@gmail.com>",
        to: to,
        subject: subject,
        html: body
    };


    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);

        } else {
            console.log('Email Sent');

        }
    })
}


module.exports = sendMailToUser;