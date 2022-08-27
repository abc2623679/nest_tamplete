import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GuardGuard } from './guard/guard.guard';

@UseGuards(GuardGuard)
@Controller()
export class AppController {
    constructor( private readonly configService : ConfigService){}
    
    @Get('db-host-from-config')
    getDatabaseHostFromConfigService(): string{
        
        return this.configService.get('DATABASE_HOST')
    }
   

}

