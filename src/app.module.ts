import { Module } from '@nestjs/common';
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
const envFilePath = ['.env', '.env.dev', '.env.prod'];
@Module({
  imports: [
    ConfigModule.forRoot({
      //是否禁止加载环境变量
      // ignoreEnvFile: true,
      //是否加载为全局模块
      isGlobal: true,
      load: [configuration],
      envFilePath,
    }),
    CacheModule.register<RedisClientOptions>({
      isGlobal: true,
      //@ts-ignore
      store: () => {
        return redisStore({
          host: '127.0.0.1',
          ttl: 5 * 1000,
          db: 4,
        });
      },
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'mysql',
          host: 'localhost',
          // host: '82.156.136.205',
          port: 3306,
          username: 'root',
          password: '123456',
          // password: 'qi000214..',
          database: 'nest',
          // entities: [Info, Photo, Course,User],
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          //同步数据库
          synchronize: true,
          dateStrings: true,
          logging: true,
          logger: 'file',
        };
      },
    }),
    TemplateModule,
    AuthModule,
    UsersModule,
    XxxModule,
    UploadModule,
    RouterModule,
    DictsModule,
    DictModule,
    //websocket
    WsModule,
    ExcelModule,
    RolesModule,
    DeptModule,
    RedisModule
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
    {
      provide: APP_INTERCEPTOR,
      // useClass: CacheInterceptor,
      useClass: MyCacheInterceptor,
    },
  ],
})
export class AppModule {}
