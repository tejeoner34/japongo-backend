import nodemailer from 'nodemailer';


 export const sendMail = (to, subject, content) => {

    const user = process.env.MAIL_USER
    const pass = process.env.MAIL_PASS

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: user,
                pass: pass
            }
        });

        const message = {
            from: 'JaponGo <japongo.proyect@gmail.com>',
            to,
            subject,
            html: content 
        };


        transporter.sendMail(message, (err, info) => {
            if (err) {
                console.log('Error occurred. ' + err.message);
                return
            }
            console.log('Message sent: %s', info.messageId);

             console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });
    
}