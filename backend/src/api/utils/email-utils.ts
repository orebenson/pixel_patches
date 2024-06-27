import nodemailer from 'nodemailer';

export async function sendPasswordResetRequestEmail(email: string, username: string, resetlink: string) {

    let transporter = nodemailer.createTransport({
        service: process.env.EMAIL_HOST,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    let mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Password Reset Request',
        html: `
                <p>Hi ${username},</p>
                <p>We received a request to reset your password. Please click the link below to reset your password:</p>
                <a href="${resetlink}">Reset Password</a>
                <p>If you did not request a password reset, please ignore this email.</p>
                <p>Thank you!</p>
            `
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        throw error;
    }
}
