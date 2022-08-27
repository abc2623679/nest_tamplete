import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as path from 'path';

// dotenv.config({ //현재 디렉토리의 env파일을 자동으로 인식하여 환경변수세팅
//   path:path.resolve(
//     (process.env.NODE_ENV ==='production')? '.production.env' : (process.env.NODE_ENV==='stage') ? '.stage.env' : '.development.env'
//   )
// })

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
