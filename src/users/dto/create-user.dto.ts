import { BadRequestException } from "@nestjs/common";
import { Transform } from "class-transformer";
import { IsString, MinLength,MaxLength, IsEmail, Matches, } from "class-validator";
import { NotIn } from "../../customDecorate/notIn";


export class CreateUserDto {
    // @Transform(({value,obj})=> { //2개읜 인자를 받는데 value는 값(name) obj는 객체(CreateUserDto)를 말함
    //     if(obj.password.includes(value.trim())){
    //         throw new BadRequestException("password는 name과 같은 문자열을 포함할 수 없음")
    //     }
    //     return value.trim()
    // })
    @NotIn('password',{ message: 'password는 name과 같은 문자열을 포함할 수 없습니다.' })
    @IsString()
    @MinLength(2)
    @MaxLength(40)
    readonly name: string;

    @IsEmail()
    @IsString()
    @MaxLength(60)
    readonly email: string;

    @IsString()
    @Matches(/^[A-Za-z\d!@#$%^&*()]{8,30}$/)
    readonly password: string;
}
