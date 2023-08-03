import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const start = async () => {
  try {
    const app = await NestFactory.create(AppModule);
    
    app.setGlobalPrefix("instagram")

    const config = new DocumentBuilder()
    .setTitle("Instagram")
    .setDescription("Instagram backend app")
    .addTag("Nestjs, postgres, JsonWebToken, Sequelize, Swagger")
    .setVersion("1.1.0")
    .build();
    
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("instagram/docs", app, document);
    
    const PORT = process.env.PORT || 3030;
    await app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    })
  } catch (error) {
    console.log(error);    
  }
}
start();