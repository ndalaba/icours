import * as nodemailer from "nodemailer"
import * as dotenv from "dotenv"
import logger from "./logger";

dotenv.config()

const transporter = nodemailer.createTransport({
    port: process.env.EMAIL_PORT,
    host: process.env.EMAIL_HOST,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    },
    //secure: true, // upgrades later with STARTTLS -- change this based on the PORT
});

const sendEmail = (to: string, subject: string, html: string, text: string = "") => {
    logger.info(`sending email to ${to}`)
    const data = {from: process.env.APP_EMAIL, to, subject, text, html}
    if (process.env.NODE_ENV !== "test")
        transporter.sendMail(data, (error, _) => {
            if (error)
                logger.error(error)
        })
}
export default sendEmail;