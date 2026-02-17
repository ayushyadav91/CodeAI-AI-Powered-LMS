import nodemailer from 'nodemailer';
import { otpTemplate as template } from '../templates/emailVerificationTemplate.js';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE == 'true', // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER, // generated ethereal user
        pass: process.env.EMAIL_PASS, // generated ethereal password
    },
});
const sendEmail = async (to,otp) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to, 
            subject: 'OTP Verification Email',
            html: template(otp), // Use provided HTML or wrap text in template
        };
        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    } 
};

export default sendEmail;  






// export const sendEmail = async (to, subject, text, htmlContent) => {
//     try {
//         const mailOptions = {
//             from: process.env.EMAIL_FROM,
//             to,
//             subject,
//             text, // Falback text version
//             html: template(htmlContent || text), // Use provided HTML or wrap text in template
//         };

//         const info = await transporter.sendMail(mailOptions);
//         console.log('Message sent: %s', info.messageId);
//         return info;
//     } catch (error) {
//         console.error('Error sending email:', error);
//         throw error;
//     }
// }; 
