// const nodemailer = require('nodemailer');
// const emailKye = gmailKye
// const transporter = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//         user: 'your.email@gmail.com',
//         pass: {emailKye}
//     }
// });

// async function sendVerificationEmail(toEmail, verificationCode) {
//     const mailOptions = {
//         from: 'your.email@gmail.com',
//         to: toEmail,
//         subject: 'Verification Code',
//         text: `Your verification code is: ${verificationCode}`
//     };

//     try {
//         let info = await transporter.sendMail(mailOptions);
//         console.log('Email sent: ' + info.response);
//     } catch (error) {
//         console.error('Error sending email:', error);
//     }
// }
import fs from 'fs/promises';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

// פונקציה לייצור קוד רנדומלי
function generateRandomCode() {
    return crypto.randomBytes(4).toString('hex');
}

// פונקציה ליצירת קוד על פי הפקודה
function createCode(command) {
    // כאן תוכל להוסיף לוגיקה מורכבת יותר ליצירת קוד על פי הפקודה
    return `
// קוד שנוצר עבור הפקודה: ${command}
function executeCommand() {
    console.log("Executing command: ${command}");
    // הוסף כאן את הלוגיקה הספציפית לפקודה
}

executeCommand();
    `;
}

async function saveCodeToServer(code, filename) {
    try {
        await fs.writeFile(`./generated_codes/${filename}`, code);
        console.log(`Code saved to ${filename}`);
    } catch (error) {
        console.error('Error saving code:', error);
        throw error;
    }
}

async function sendCodeByEmail(code, email) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com', // הכנס כאן את כתובת המייל שלך
            pass: 'your-password' // הכנס כאן את הסיסמה שלך או מפתח אפליקציה
        }
    });

    let mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Your Generated Code',
        text: 'Here is your generated code:',
        html: `<p>Here is your generated code:</p><pre>${code}</pre>`
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

export async function generateAndSendCode(command, email) {
    const code = createCode(command);
    const filename = `${generateRandomCode()}.js`;
    
    try {
        await saveCodeToServer(code, filename);
        await sendCodeByEmail(code, email);
        return { success: true, filename };
    } catch (error) {
        console.error('Error in generateAndSendCode:', error);
        return { success: false, error: error.message };
    }
}