import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import emailConfig from './config/emailConfig';
import { validationSchema } from './config/validationSchema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { UsersController } from './users/users.controller';
import { AuthModule } from './auth/auth.module';
import authConfig from './config/authConfig';
import { LoggerModule } from './logger/logger.module';
import * as winston from 'winston';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './error/error';
import { BatchModule } from './batch/batch.module';
import { TaskService } from './task/task.service';


@Module({
   imports: [UsersModule, EmailModule, LoggerModule,
   ConfigModule.forRoot({
   envFilePath:[`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
   load:[emailConfig, authConfig],
   isGlobal:true,
   validationSchema,
 }),

 WinstonModule.forRoot({
  transports :[
    new winston.transports.Console({
      level:process.env.NODE_ENV ==='production' ? 'info':'silly', //로그레벨 silly가 최상레벨
      format: winston.format.combine(
        winston.format.timestamp(),
        nestWinstonModuleUtilities.format.nestLike('Myapp',{prettyPrint:true})
      )

    })
  ]
 }),
   TypeOrmModule.forRoot({
    type:'mysql',
    host:process.env.DATABASE_HOST,
    port:3307,
    username:process.env.DATABASE_USERNAME,
    password:process.env.DATABASE_PASSWORD,
    database:'test',
    entities:[__dirname+'/**/*.entity{.ts,.js}'],//엔티티 인식경로
    synchronize:Boolean(process.env.DATABASE_SYNCHRONIZE) // 소스코드기반으로 스키마 동기화여부
   }),AuthModule,LoggerModule, BatchModule
],
  controllers: [AppController],
  providers: [AppService, ConfigService,
  {
    provide:APP_FILTER,
    useClass :HttpExceptionFilter,
  },
  TaskService//예외필터수행이 예외가 발생한 모듈 외부에서 이루어지기 때문에 의존성 주입을하려면 예외필터를 커스텀프로바이더에 등록해야함,
]})

export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) : any {
    consumer.apply(LoggerMiddleware).exclude({path:'users',method:RequestMethod.GET}) // /users에 get은 제외하고 UserController전체적용
    .forRoutes(UsersController)
  }
}
