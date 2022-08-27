import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { EmailService } from '../email/email.service'
import { Repository, Connection } from 'typeorm';
import { ulid } from 'ulid';
import * as uuid from 'uuid';
import { UserEntity } from './entities/user.entity';
import { UserInfo } from './interface/interface';




@Injectable()
export class UsersService {

  constructor(
    private emailService : EmailService,
    private authService : AuthService,

    private connection : Connection,

    @InjectRepository(UserEntity) private usersRepository :Repository<UserEntity>, //InjectRepository로 userEntity 연결

    )
     {}

  async createUser(name: string, email : string, password :string) {
    const userExist = await this.checkUserExists(email);
    if(userExist){
      throw new UnprocessableEntityException('해당 이메일로는 가입할 수 없습니다')
    }
    await this.checkUserExists(email)  

    const signVerifyToken = uuid.v1()
    
    await this.saveUser(name,email,password,signVerifyToken);
    await this.sendMemverJoinEmail(email,signVerifyToken)
  }

  private async checkUserExists(emailAdress:string): Promise<boolean>{
    const user = await this.usersRepository.findOne({email: emailAdress})
    return user !== undefined
  }


  private async saveUser(name: string, email: string, password: string, signupVerifyToken: string) {
    const user = new UserEntity();
    user.id = ulid();
    user.name = name;
    user.email = email;
    user.password = password;
    user.signupVerifyToken = signupVerifyToken;
    await this.usersRepository.save(user);
  }

  //트렌젝션 방법 1
  private async saveUserUsingQueryRunner(name: string, email: string, password: string, signupVerifyToken: string) {

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try{
      const user = new UserEntity();
      user.id = ulid();
      user.name = name;
      user.email = email;
      user.password = password;
      user.signupVerifyToken = signupVerifyToken;
      await queryRunner.manager.save(user)

    // throw new InternalServerErrorException(); // 테스트용 에러임

      await queryRunner.commitTransaction();
    }catch(e){
      await queryRunner.rollbackTransaction();
    }finally{
      await queryRunner.release();
    }

  }
  //트렌젝션 방법2
  private async saveUserUsingTransaction(name: string, email: string, password: string, signupVerifyToken: string) {
    await this.connection.transaction(async manager=>{
      const user =new UserEntity();
      user.id = ulid();
      user.name = name;
      user.email = email;
      user.password = password;
      user.signupVerifyToken = signupVerifyToken;

      await manager.save<UserEntity>(user);

      // throw new InternalServerErrorException(); // 테스트용 에러임

    })
    
  }


  private async sendMemverJoinEmail(email:string, signVerifyToken:string){
    await this.emailService.sendMemberJoinVerification(email, signVerifyToken);
  }

  async verifyEmail(signupVerifyToken: string): Promise<string> {
    const user = await this.usersRepository.findOne({signupVerifyToken})

    if(!user){
      throw new NotFoundException("유저가 존재하지 않습니다")
    }

    return this.authService.login({
      id:user.id,
      name:user.name,
      email:user.email
    })

  }

  async login(email: string, password: string): Promise<string> {

    const user =await this.usersRepository.findOne({email,password})

    if(!user) throw new NotFoundException("유저가 존재하지않습니다")

    return this.authService.login({
      id:user.id,
      name:user.name,
      email:user.email
    })
    
  }

  async getUserInfo(userId : string): Promise<UserInfo>{
    const user= await this.usersRepository.findOne({id:userId})

    if(!user){
      throw new NotFoundException('유저가 존재하지않습니다.')
    }

    return{
      id:user.id,
      name:user.name,
      email:user.email
    }
  
  }

  async findOne(userId : number, a=1): Promise<string>{

    throw new Error('Method not implemented')
  }

}

