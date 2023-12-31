import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './models/user.models';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    JwtModule.register({})
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
