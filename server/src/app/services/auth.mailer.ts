import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config({ path: 'src/.env' })


const transporter = nodemailer.createTransport( {
    service: 'yandex',
    host: 'smtp.yandex.ru',
    port: 993,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
} )

export const sendVerifyToEmail = async (to: string, token: string) => {
    console.log( process.env.EMAIL_USER )
    
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: 'Подтверждение регистрации',
        html: `
            <h1>Подтверждение регистрации</h1>
            <p>Пожалуйста, подтвердите свою регистрацию, перейдя по следующей ссылке:</p>
            <a href="http://${process.env.HOST}:${process.env.PORT}/api/auth/verify/${token}">Подтвердить регистрацию</a>
        `
    }

    transporter.sendMail( mailOptions, ( err, info ) => {
        if ( err ) {
            console.error('Ошибка при отправке письма:', err);
        } else {
            console.log('Письмо успешно отправлено:', info.response);
        }
    })
}