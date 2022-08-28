import { Logger, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from '../intercepter/intercepter';
import { MyLogger } from '../my-logger/my-logger.service';

@Module({
    providers:[MyLogger,Logger, { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor }],
    exports:[MyLogger]
})
export class LoggerModule {}
