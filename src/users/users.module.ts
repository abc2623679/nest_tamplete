import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { EmailModule } from '../email/email.module';
import { UserEntity } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    imports:[EmailModule, AuthModule,
        TypeOrmModule.forFeature([UserEntity]) //UserEntity를 userModule에서 사용
    ],
    controllers:[UsersController],
    providers:[UsersService]

})
export class UsersModule {}
