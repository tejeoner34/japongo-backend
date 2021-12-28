import nodemailer from 'nodemailer';

/**
 * Funcion que envía el contenido de un mail (content) con el asunto (subject)
 * a la dirección de destino (to)
 */
 export const sendMail = (to, subject, content) => {

    const user = process.env.MAIL_USER
    const pass = process.env.MAIL_PASS
    /**
     * Para poder enviar mails necesito un servidor SMTP.
     * Si tengo una cuenta de GMAIL o OUTLOOK podría usarla como servidor SMTP
     * Esta función tiene que crear utilizando la librería `nodemailer`:
     * 
     * 1- Conexión con el servidor SMTP a través de una cuenta
     * 2- Crear el mensaje
     * 3- Enviar el mensaje
     */

    // Como esto es un ejemplo utilizaremos un servidor SMTP de prueba, creando una cuenta de prueba
    // En una app real necesitaríamos configurar una cuenta real
    // esto es solo para generar una cuenta de prueba
    

        // Creamos la conexión de transporte con nuestro servidor SMTP
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: user,
                pass: pass
            }
        });

        // Creamos el mensaje, en este caso en HTML
        const message = {
            from: 'JaponGo <japongo.proyect@gmail.com>',
            to,
            subject,
            html: content // ponemos el contenido
        };

        // utilizamos nuestro transporte SMTP para enviar el mail, indicándole el mensaje. 
        // Recibiríamos un callback con el resultado del envío
        transporter.sendMail(message, (err, info) => {
            if (err) {
                console.log('Error occurred. ' + err.message);
                return
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account 
            // esto es solo porque estamos usando una cuenta de pruebas
             console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });
    
}