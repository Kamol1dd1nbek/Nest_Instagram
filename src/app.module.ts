import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';
import { User } from './user/models/user.models';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      username: process.env.PG_USER,
      database: process.env.PG_DB,
      password: process.env.PG_PASSWORD,
      host: String(process.env.PG_HOST),
      port: +process.env.PG_PORT,
      logging: true,
      autoLoadModels: true, 
      models: [User]
    }),
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}