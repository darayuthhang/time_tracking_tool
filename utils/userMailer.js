const nodemailer = require("nodemailer");


class UserMailer {
    getTransporter() {
        return nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'darayuthhang12@gmail.com',
                pass: 'kdydrurwfgrydzek',
            },
        });
    }
    async getUserEmailInfo(fromText, text, email, subject, code, typeOfEmail) {
        let object = {
            from: fromText,
            to: email,
            subject: subject,
            text: text,
            html: ` <p>${code}</p>`, // html body
        }
        if (typeOfEmail === "resetPassword") {
            object = {
                from: fromText,
                to: email,
                subject: subject,
                text: text,
                html: `
                    <p>${text} </p>
                    <p>${code}</p>
                `
            }
        }
        return object;

    }
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

