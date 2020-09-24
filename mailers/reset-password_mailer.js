const nodeMailer = require('../config/nodemailer');

//another way to exporting a method
exports.resetPassword = (user) => {
    console.log('inside user mailer',user)
    let htmlString = nodeMailer.renderTemplate({user:user} , '/resetPassword/reset_password.ejs');
    nodeMailer.transporter.sendMail({
        from: 'anshugargg09@gmail.com',
        to: user.email,
        subject: 'Reset Password Link',
        html: htmlString
    },(err,info) => {
        if(err){console.log('error in sending mail',err);return;}

        console.log('Message Sent' , info);
        return;

    });
}