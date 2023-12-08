import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import rateLimit from 'express-rate-limit';
import csurf from 'csurf';
import helmet from 'helmet'
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { WsAdapter } from './websocket/ws.adapter';
import dayjs from 'dayjs';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const options = new DocumentBuilder()
    .setTitle('Nest项目')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  console.log('http://localhost:9622/api');
  //cors
  // app.enableCors();
  //静态文件资源
  app.useStaticAssets('uploads', { prefix: '/uploads' })
  //限速
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    })
  );
  //CSRF保护
  // app.use(csurf());
  //通过适当地设置 HTTP 头，Helmet 可以帮助保护您的应用免受一些众所周知的 Web 漏洞的影响
  app.use(helmet());

  //cookie
  app.use(cookieParser('cookiekey'));

  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    }))
    app.useWebSocketAdapter(new WsAdapter(app));
  await app.listen(9622);
}
globalThis.$dayJS=dayjs
bootstrap();
