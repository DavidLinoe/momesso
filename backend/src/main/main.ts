import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ResponseStatusInterceptor } from 'src/utils/interceptors/response-status.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ResponseStatusInterceptor());

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Hub')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'bearer',
    )
    .build();
  const documentFactory = () => {
    const document = SwaggerModule.createDocument(app, config);
    document.security = [{ bearer: [] }];
    return document;
  };
  SwaggerModule.setup('swagger', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
