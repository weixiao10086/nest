import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import rateLimit from 'express-rate-limit';
import { RedisStore } from 'rate-limit-redis';
// import csurf from 'csurf';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { WsAdapter } from './websocket/ws.adapter';
import { AllExceptionsFilter } from './utils/any-exception.filter';
import { OrmExceptionsFilter } from './utils/orm-exception.filter';
import configuration from 'config/configuration';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService<typeof configuration>);

  //Swagger文档
  const options = new DocumentBuilder()
    .setTitle('Nest项目')
    .setDescription('描述')
    .addBearerAuth()
    // .setVersion('1.0')
    // .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);//swagger路径

  //cors
  app.enableCors();
  //静态文件资源
  app.useStaticAssets('uploads', { prefix: '/uploads' });
  //限速
  let redisClient = app.get('REDIS');
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      limit: 1000, // limit each IP to 100 requests per windowMs
      message: '请求过多', //返回消息
      statusCode: 429, //返回http状态码
      keyGenerator: (req: any, res) => req.ip, //通过ip限制
      //使用redis存储
      store: new RedisStore({
        sendCommand: (...args: string[]) => redisClient.call(...args),
      }),
    }),
  );
  //通过适当地设置 HTTP 头，Helmet 可以帮助保护您的应用免受一些众所周知的 Web 漏洞的影响
  //将设置响应头的csp字段https://juejin.cn/post/7386594813510811700
  app.use(helmet({
    "contentSecurityPolicy": {//csp设置
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      }
    }
  }));

  //cookie
  app.use(cookieParser('cookiekey'));

  //CSRF保护
  // app.use(csurf({ cookie: true }));

  //session
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    }),
  );

  // const httpAdapter = app.getHttpAdapter();
  // const adapterHost = app.get(HttpAdapterHost);

  //websocket
  app.useWebSocketAdapter(new WsAdapter(app));

  //异常过滤
  // app.useGlobalFilters(new AllExceptionsFilter());
  // app.useGlobalFilters(new OrmExceptionsFilter());

  //全局管道    Dto数据验证
  app.useGlobalPipes(new ValidationPipe({
    //禁用详细错误message
    "disableErrorMessages": false,
    //验证不通过返回httpp状态码
    "errorHttpStatusCode": 400
  }));

  // MVC(模型-视图=控制器)
  app.useStaticAssets('public', {
    prefix: '/public',
  });
  app.setBaseViewsDir('views');//文件位置
  app.setViewEngine('hbs');//模板引擎

  //启动项目监听端口...
  await app.listen(configService.get('APP_PORT'));

  let swaggerUrl = `http://localhost:${configService.get('APP_PORT')}/api`;
  Logger.verbose(swaggerUrl, 'api文档地址');
  Logger.verbose(swaggerUrl + `-json`, 'api文档json地址');
}
bootstrap();
// import { Faker, zh_CN } from '@faker-js/faker';
// const faker = new Faker({
//   locale: [zh_CN],
// })
// globalThis.$faker = faker
