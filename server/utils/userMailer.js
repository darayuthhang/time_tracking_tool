const nodemailer = require("nodemailer");
const path = require('path');

class UserMailer {
    getTransporter() {
        return nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'darayuthhang12@gmail.com',
                pass: 'uzivshjdteagebre',
            },
        });
    }
    async getUserEmailInfo(fromText, text, email, subject, code, typeOfEmail) {
        let object = {
            from: fromText,
            to: email,
            subject: subject,
            text: text,
            html: `
                <html>
                <body>
                    <h1>Taskkru</h1>
                    <img  style="width:50px" src="cid:taskkru-id" alt="Image">
                    <div style="font-weight:bold; font-size:35px">Verification code</div>
                    <div style="font-size:40px">${code}</div>
                    <p>Here is your OTP verification code.</p>
                    <p>It will expire in 6 minutes.</p>
                </body>
                </html>
            `,
            attachments: [
                {
                    filename: 'squirrel_write_journal.png',
                    path: path.join(__dirname, 'public/images/squirrel_write_journal_192.png'),
                    cid: 'taskkru-id', // Use this ID in the HTML img tag
                },
            ],
        }
        if (typeOfEmail === "resetPassword") {
            object = {
                from: fromText,
                to: email,
                subject: subject,
                text: text,
                html: `
                <html>
                <body>
                    <h1>Taskkru</h1>
                    <img style="width:50px" src="cid:taskkru-id" alt="Image">
                    <p>${text} </p>
                    <a href="${code}">${code}</a>
                    <p>Here is your link.</p>
                    <p>It will expire in 6 minutes.</p>
                </body>
                </html>
            `,
                attachments: [
                    {
                        filename: 'squirrel_write_journal.png',
                        path: path.join(__dirname, 'public/images/squirrel_write_journal_192.png'),
                        cid: 'taskkru-id', // Use this ID in the HTML img tag
                    },
                ],
               
            }
        }
        return object;

    }
    /**
     * @code cannot be link or verification code
     */
    async sendEmail(from, text, email, subject, code, typeOfEmail = '') {

        try {
            const transporter = this.getTransporter()
            let userEmailInfo = await this.getUserEmailInfo(from, text, email, subject, code, typeOfEmail)
            await transporter.sendMail(userEmailInfo);
            //return True if the mail send successfuly
            return true;
        } catch (error) {
            console.log(error, "email not sent");
        }
        //return null if email send unsuccessfuly
        return false;
    }
    // async sendFeedBackThroughEmail(text, email, subject) {
    //     try {
    //         const transporter = this.getTransporter()
    //         await transporter.sendMail({
    //             from: "anonymous",
    //             to: email,
    //             subject: subject,
    //             text: text,

    //         });
    //         //return True if the mail send successfuly
    //         return true;
    //     } catch (error) {
    //         console.log(error, "email not sent");
    //     }
    //     //return null if email send unsuccessfuly
    //     return false;
    // }
}
module.exports = new UserMailer();

