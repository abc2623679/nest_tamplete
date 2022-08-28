import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { NextFunction } from 'express';
import { MyLogger } from './my-logger/my-logger.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { HttpExceptionFilter } from './error/error';
import { LoggingInterceptor, TransformInterceptor } from './intercepter/intercepter';
import { loggers } from 'winston';



// dotenv.config({ //현재 디렉토리의 env파일을 자동으로 인식하여 환경변수세팅
//   path:path.resolve(
//     (process.env.NODE_ENV ==='production')? '.production.env' : (process.env.NODE_ENV==='stage') ? '.stage.env' : '.development.env'
//   )
// })

function test(req:Request,res:Response,next:NextFunction) {
  console.log("전역미들웨어테스트");
  next()
}
async function bootstrap() {
  const app = await NestFactory.create(AppModule
    , 
    //{logger:false} 로그안나오게처리가능
    // {
    // logger: process.env.NODE_ENV === 'production' ? ['error', 'warn', 'log']: ['error', 'warn', 'log', 'verbose', 'debug'] //개발환경레벨에 맞게 로그 설정가능
    // }
    )

  app.useGlobalInterceptors(new LoggingInterceptor(), new TransformInterceptor());

  app.useLogger(app.get(WINSTON_MODULE_PROVIDER))//전역로그설정
  app.use(test)
  app.useGlobalFilters(new HttpExceptionFilter())// 전역 예외필터
  app.useGlobalPipes(new ValidationPipe({
    transform:true
  }))

  await app.listen(3000);
}
bootstrap();
