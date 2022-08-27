import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpCode, Header, Redirect, Query, ParseIntPipe, HttpStatus, DefaultValuePipe, Headers, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { ValidationPipe } from '../pipe/validation.pipe';
import { AuthService } from '../auth/auth.service';
import { UserInfo } from './interface/interface';
import { GuardGuard } from '../guard/guard.guard';

@Controller('users')
export class UsersController {

  constructor(
    private readonly usersService: UsersService,
    private readonly authService :AuthService
    ){}

  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<(number | string)[]> {
    const { name, email, password } = dto;
    await this.usersService.createUser(name, email, password );
    return [11,process.env.DATABASE_HOST]
  }

  @Post('/email-verify')
  async verifyEmail(@Query() dto: VerifyEmailDto): Promise<string> {
    const {signupVerifyToken} = dto

    return await this.usersService.verifyEmail(signupVerifyToken)
  }

  @Post('/login')
  async login(@Body() dto: UserLoginDto): Promise<string> {
    
    const {email, password } = dto;

    return await this.usersService.login(email,password)
  }

  @UseGuards(GuardGuard)
  @Get('/:id')
  async getUserInfo(@Headers() headers:Headers ,@Param('id') userId: string):Promise<UserInfo> {
    const jwtString = headers["authorization"].split('Bearer ')[1];

    this.authService.verify(jwtString)
    
    return this.usersService.getUserInfo(userId)
  }

  @Get('/find/:id')
  //파이프를 통해 상황에 맞게 statuscode를 변경해서 보낼 수 있음
  findOne(@Param('id',new ParseIntPipe({errorHttpStatusCode:HttpStatus.BAD_GATEWAY})) id :number){
    return this.usersService.findOne(id);
  }

  @Get('/find1/:id')
  //디폴트밸류를 지정할수있는 파이트도 가능
  findOne1(@Query('offset',new DefaultValuePipe(10), ParseIntPipe) offset :number,
           @Query('limit',new DefaultValuePipe(5), ParseIntPipe) limit :number){

    return this.usersService.findOne(offset);
  }

  @Get('/find2/:id')
  findOne2(@Query('offset',ValidationPipe) offset :number){
    return this.usersService.findOne(offset);
  }
}
