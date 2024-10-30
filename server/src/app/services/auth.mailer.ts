import nodemailer from 'nodemailer'
import ejs from 'ejs'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: 'src/.env' })
const HOST = process.env.HOST
const PORT = process.env.PORT


const transporter = nodemailer.createTransport( {
    service: 'yandex',
    host: 'smtp.yandex.ru',
    port: 993,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
} )

export const sendVerifyToEmail = async (to: string, token: string) => {

    const ejsPath = path.join( __dirname, '../../public/email-template.ejs' )
    
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: 'Подтверждение регистрации',
        html: await ejs.renderFile( ejsPath, { HOST, PORT, token } )
    }

    return await transporter.sendMail( mailOptions)
}