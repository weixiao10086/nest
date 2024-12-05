import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TemplateModule } from './template/template.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from 'config/configuration';
import { JwtAuthGuard } from './auth/JwtAuthGuard';
import { XxxModule } from './xxx/xxx.module';
import { UploadModule } from './upload/upload.module';
import { RouterModule } from './router/router.module';
import { DictsModule } from './dicts/dicts.module';
import { DictModule } from './dict/dict.module';
import { RolesGuard } from './roles/roles.guard';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { redisStore } from 'cache-manager-ioredis-yet';
import { MyCacheInterceptor } from './cache/my-cache.interceptor';
import { WsModule } from './websocket/ws.module';
import { ExcelModule } from './excel/excel.module';
import { RolesModule } from './roles/roles.module';
import { DeptModule } from './dept/dept.module';
import type { RedisClientOptions } from 'redis';
import { RedisModule } from './redis/redis.module';
import { ParamsModule } from './params/params.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MinioModule } from './minio/minio.module';
import { MqttModule } from './mqtt/mqtt.module';
import { LoggerMiddleware } from './logs/logger.middleware';
import { LogsModule } from './logs/logs.module';
// const envFilePath = ['.env', '.env.dev', '.env.prod'];
const envFilePath = `.env${process.env.NODE_ENV ? '.' + process.env.NODE_ENV : ''
  }`;

@Module({
  imports: [
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', '/uploads'),
    // }),
    ConfigModule.forRoot({
      //是否禁止加载环境变量
      // ignoreEnvFile: true,
      //是否加载为全局模块
      isGlobal: true,
      load: [configuration],
      envFilePath,
    }),
    CacheModule.registerAsync<RedisClientOptions>({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const Redis_config = configService.get('REDIS');
        return {
          isGlobal: true,
          //@ts-ignore
          store: () => {
            //@ts-ignore
            return redisStore({
              host: Redis_config.host,
              ttl: Redis_config.ttl * 1000,
              db: Redis_config.database,
              password: Redis_config.password,
            });
          },
        };
      },
    } as any),
    // CacheModule.register<RedisClientOptions>({
    //   isGlobal: true,
    //   //@ts-ignore
    //   store: () => {
    //     return redisStore({
    //       host: '127.0.0.1',
    //       ttl: 5 * 1000,
    //       db: 4,
    //     });
    //   },
    // }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<typeof configuration>) => {
        const DATABASE_config = configService.get('DATABASE');
        return {
          type: 'mysql',
          host: DATABASE_config.host,
          port: DATABASE_config.port,
          username: DATABASE_config.username,
          password: DATABASE_config.password,
          database: DATABASE_config.database,
          // entities: [Info, Photo, Course,User],
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          //同步数据库
          synchronize: process.env.NODE_ENV != 'prod' ? true : false,
          dateStrings: true,
          logging: true,
          logger: 'file',
        };
      },
    } as any),
    TemplateModule,
    AuthModule,
    UsersModule,
    XxxModule,
    UploadModule,
    RouterModule,
    DictsModule,
    DictModule,
    WsModule,
    ExcelModule,
    RolesModule,
    DeptModule,
    RedisModule,
    ParamsModule,
    MqttModule,
    LogsModule,
    // MinioModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    //token
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    //角色权限
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    //缓存
    // {
    //   provide: APP_INTERCEPTOR,
    //   // useClass: CacheInterceptor,
    //   useClass: MyCacheInterceptor,
    // },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude('logs/(.*)')
      .forRoutes('*');
  }
}
