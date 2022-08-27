import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [UsersModule, EmailModule, ConfigModule.forRoot({
    envFilePath:(process.env.NODE_ENV ==='production') ? './production.env' : (process.env.NODE_ENV === 'stage') ? '.stage.env' : '.development.env'

  })],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}

// imports: [UsersModule, EmailModule, ConfigModule.forRoot({
//   envFilePath:[`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
//   load:[emailConfig],
//   isGlobal:true,
//   //validationSchema,
// })],
