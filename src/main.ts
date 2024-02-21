import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import rateLimit from 'express-rate-limit';
// import csurf from 'csurf';
import helmet from 'helmet'
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { WsAdapter } from './websocket/ws.adapter';
import { AllExceptionsFilter } from './utils/any-exception.filter';
import { OrmExceptionsFilter } from './utils/orm-exception.filter';
import configuration from 'config/configuration';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService<typeof configuration>);
  const options = new DocumentBuilder()
    .setTitle('Nest项目')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  //cors
  app.enableCors();
  //静态文件资源
  app.useStaticAssets('uploads', { prefix: '/uploads' })
  //限速
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 1000, // limit each IP to 100 requests per windowMs
    })
  );
  //通过适当地设置 HTTP 头，Helmet 可以帮助保护您的应用免受一些众所周知的 Web 漏洞的影响
  app.use(helmet());

  //cookie
  app.use(cookieParser('cookiekey'));
  //CSRF保护
  // app.use(csurf({ cookie: true }));

  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    }))
  // const httpAdapter = app.getHttpAdapter();
  // const adapterHost = app.get(HttpAdapterHost);
  app.useWebSocketAdapter(new WsAdapter(app));
  // app.useGlobalFilters(new AllExceptionsFilter());
  // app.useGlobalFilters(new OrmExceptionsFilter());

  // MVC(模型-视图=控制器)
  app.useStaticAssets('public',
    {
      prefix: '/public',
    }
  );
  app.setBaseViewsDir('views');
  app.setViewEngine('hbs');
  await app.listen(configService.get('APP_PORT'));
  Logger.verbose(`http://localhost:${configService.get('APP_PORT')}/api`);
}
bootstrap();
// import { Faker, zh_CN } from '@faker-js/faker';
// const faker = new Faker({
//   locale: [zh_CN],
// })
// globalThis.$faker = faker
