import nodemailer from 'nodemailer'


export const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'tarasckinilya@yandex.ru',
        pass: '89312278350'
    }
})

export const mailOptions = ( from: string, to: string, token: string ) => ({
    from: from,
    to: to,
    subject: 'Подтвердите свой адресс электронной почты',
    html: `
        <p>Для подтверждения вашего адреса электронной почты, пожалуйста, перейдите по следующему ссылке:</p>
        <a href="http://localhost:3000/api/auth/verify?token=${ token }">Подтвердить</a>
      `
})