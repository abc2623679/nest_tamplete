import { Injectable, Logger } from '@nestjs/common';
import { MyLogger } from './my-logger/my-logger.service';

@Injectable()
export class AppService {

    constructor(private myLogger :MyLogger){}

    private readonly logger = new Logger(AppService.name);

    getHello(): string {
      this.myLogger.error('level: error');
      this.myLogger.warn('level: warn');
      this.myLogger.log('level: log');
      this.myLogger.verbose('level: verbose');
      this.myLogger.debug('level: debug');
  
      return 'Hello World!';
    }
  }
