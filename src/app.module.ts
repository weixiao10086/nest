import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InfoModule } from './info/info.module';
import { PhotoModule } from './photo/photo.module';
import { CourseModule } from './course/course.module';
import { TemplateModule } from './template/template.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import configuration from 'config/configuration';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/JwtAuthGuard';
import { XxxModule } from './xxx/xxx.module';
import { UploadModule } from './upload/upload.module';
import { WsStartGateway } from './websocket/ws.gateway';
import { RouterModule } from './router/router.module';
import { DictsModule } from './dicts/dicts.module';
import { DictModule } from './dict/dict.module';
import { RolesGuard } from './roles/roles.guard';
import { CaslModule } from './casl/casl.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      //是否禁止加载环境变量
      // ignoreEnvFile: true,
      //是否加载为全局模块
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      // host: '82.156.136.205',
      port: 3306,
      username: 'root',
      password: '',
      // password: '123456',
      // password: 'qi000214..',
      database: 'nest',
      // entities: [Info, Photo, Course,User],
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      //同步数据库
      synchronize: true,
      dateStrings: true,
      logging: true,
      logger: "file"
    }),
    InfoModule,
    PhotoModule,
    CourseModule,
    TemplateModule,
    AuthModule,
    UsersModule,
    XxxModule,
    UploadModule,
    RouterModule,
    DictsModule,
    DictModule,
    CaslModule,
  ],
  controllers: [AppController],
  providers: [AppService,
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
    //websocket
    WsStartGateway
  ],

})
export class AppModule { }
