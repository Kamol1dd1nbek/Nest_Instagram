import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

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
      host: process.env.HOST,
      port: +process.env.PG_PORT,
      logging: true,
      autoLoadModels: true, 
      models: []
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
