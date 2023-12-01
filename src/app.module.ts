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
import { RouterModule } from './router/router.module';
import { XxxModule } from './xxx/xxx.module';
import { CrudModule } from './crud/crud.module';
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
      port: 3306,
      username: 'root',
      password: '',
      database: 'nest',
      // entities: [Info, Photo, Course,User],
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      dateStrings: true,
      logging: true,
      logger: "file"
    },
    ),
    InfoModule,
    PhotoModule,
    CourseModule,
    TemplateModule,
    AuthModule,
    UsersModule,
    RouterModule,
    XxxModule,
    CrudModule,
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    }
  ],

})
export class AppModule { }
