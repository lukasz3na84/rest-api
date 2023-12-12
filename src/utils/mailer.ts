import nodemailer, { SendMailOptions } from 'nodemailer';
import log from './logger';
import '../middleware/dotenvMiddleware';

interface SmtpConfig {
    user: string;
    pass: string;
    host: string;
    port: number;
    secure: boolean;
}

const smtpConfig: SmtpConfig = {
    user: process.env.SMTP_USER ?? '',
    pass: process.env.SMTP_PASS ?? '',
    host: process.env.SMTP_HOST ?? '',
    port: parseInt(process.env.SMTP_PORT || '0', 10),
    secure: process.env.SMTP_SECURE === 'true',
};

// async function createTestCreds() {
//     const creds = await nodemailer.createTestAccount();
//     console.log( { creds });
// }

// createTestCreds();

const transporter = nodemailer.createTransport({
    ...smtpConfig,
    auth: {
        user: smtpConfig.user,
        pass: smtpConfig.pass
    }
});

async function sendEmail(payload: SendMailOptions) {
    return new Promise((resolve, reject) => {
        transporter.sendMail(payload, (err, info) => {
            if (err) {
                log.error(err);
                reject(err)
            } else {
                log.info(`Preview URL: ${nodemailer.getTestMessageUrl(info)} `);
                resolve(info);
            }
        })
    });
}

export default sendEmail;