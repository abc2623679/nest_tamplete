import { Injectable } from '@nestjs/common';
import { EmailService } from 'src/email/email.service'
import * as uuid from 'uuid';


@Injectable()
export class UsersService {

  constructor(private emailService : EmailService) {}

  async createUser(name: string, email : string, password :string) {
    await this.checkUserExists(email)  

    const signVerifyToken = uuid.v1()
    
    await this.saveUser(name,email,password,signVerifyToken);
    await this.sendMemverJoinEmail(email,signVerifyToken)
  }

  private checkUserExists(email:string){
    return false;
  }

  private saveUser(name :string, email:string,password:string,signVerifyToken:string){
    return;
  }

  private async sendMemverJoinEmail(email:string, signVerifyToken:string){
    await this.emailService.sendMemberJoinVerification(email, signVerifyToken);
  }

  async verifyEmail(signupVerifyToken: string): Promise<string> {
  
    throw new Error('Method not implemented.');
  }

  async login(email: string, password: string): Promise<string> {

    throw new Error('Method not implemented.');
  }

  async getUserInfo(userId : string): Promise<string>{

    throw new Error('Method not implemented')
  }

  findOne(id:number,a= 11){
    return "테스트"
  }


}

