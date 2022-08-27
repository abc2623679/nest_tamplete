import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { NextFunction } from 'express';



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
  const app = await NestFactory.create(AppModule);
  app.use(test)
  app.useGlobalPipes(new ValidationPipe({
    transform:true
  }))

  await app.listen(3000);
}
bootstrap();
