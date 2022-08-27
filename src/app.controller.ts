import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
    constructor( private readonly configService : ConfigService){}

    @Get('db-host-from-config')
    getDatabaseHostFromConfigService(): string{
        console.log(process.env.NODE_ENV)
        return this.configService.get('DATABASE_HOST')
    }
   

}

