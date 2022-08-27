import { Injectable,Inject, UnauthorizedException } from '@nestjs/common';
import authConfig from '../config/authConfig'
import * as jwt from 'jsonwebtoken'
import { ConfigType } from '@nestjs/config';

interface User{
    id:string;
    name:string;
    email:string
}

@Injectable()
export class AuthService {
    constructor(
        @Inject(authConfig.KEY) private config: ConfigType<typeof authConfig>,
    )  { } 

    login(user:User){

        const payload = {...user};

        return jwt.sign(payload,this.config.jwtSecret,{
            expiresIn:'1d',
            audience:"강용수테스트",
            issuer:"강용수"
        })
    }

    verify(jwtString:string){

        try{
            const payload = jwt.verify(jwtString,this.config.jwtSecret) as (jwt.JwtPayload | string) & User;

            const {id, email} = payload;

            return{
                userId:id,
                email
            }
    
        }catch(e){
            throw new UnauthorizedException()
        }
    }
}


