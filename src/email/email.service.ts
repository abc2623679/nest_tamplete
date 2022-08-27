import { Injectable,Inject } from '@nestjs/common';
import Mail = require('nodemailer/lib/mailer');
import * as nodemailer from 'nodemailer';
import emailConfig from 'src/config/emailConfig'
import { ConfigType } from '@nestjs/config';

interface EmailOptions{
    to:string;
    subject:string;
    html:string;
}

@Injectable()
export class EmailService{
    
    private transporter : Mail

    constructor(
    ){
        this.transporter = nodemailer.createTransport({
            service:'Gmail',
            auth:{
                user: 'abc2623679@gmail.com',
                pass: 'pheeuroypbpjwyae' 
            }
        })
    }

    async sendMemberJoinVerification( emailAdress:string , signupVerifyToken:string){
        const baseUrl = 'http://localhost:3000'
        const url = `${baseUrl}/users/email-verify?signupVerifyToken=${signupVerifyToken}`
    
        const mailOptions: EmailOptions ={
            to: emailAdress,
            subject :'가입 인증 메일',
            html:`
            가입확인 버튼를 누르시면 가입 인증이 완료됩니다.<br/>
            <form action="${url}" method="POST">
              <button>가입확인</button>
            </form>
            `
        }

        return await this.transporter.sendMail(mailOptions)
    }
}