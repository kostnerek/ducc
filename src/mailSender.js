import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'kostnerek00@gmail.com',
        pass: 'tzatnkomlkrsdsrb',
    }
});
const sendMail = (to, subject, html, res) => {

    let mailOptions = {
        from: 'kostnerek00@gmail.com',
        to,
        subject,
        html,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(500).send( {'error': error} );
        }
        res.status(200).send( {'status': info} );
    });
}

export default sendMail