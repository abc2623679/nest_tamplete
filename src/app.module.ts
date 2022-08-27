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

@Module({
   imports: [UsersModule, EmailModule,
   ConfigModule.forRoot({
   envFilePath:[`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
   load:[emailConfig, authConfig],
   isGlobal:true,
   validationSchema,
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
   }),AuthModule
],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})

export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) : any {
    consumer.apply(LoggerMiddleware).exclude({path:'users',method:RequestMethod.GET}) // /users에 get은 제외하고 UserController전체적용
    .forRoutes(UsersController)
  }
}
