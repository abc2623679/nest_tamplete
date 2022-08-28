import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { GuardGuard } from './guard/guard.guard';

//@UseGuards(GuardGuard)
@Controller()
export class AppController {
    constructor( private readonly configService : ConfigService,
        private readonly appService : AppService){}
    
    @Get('db-host-from-config')
    getDatabaseHostFromConfigService(): string{
        
        return this.appService.getHello()
    }
   

}

