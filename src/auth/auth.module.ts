import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { RolesModule } from 'src/roles/roles.module';
import { ConfigService } from '@nestjs/config';
import { RouterModule } from 'src/router/router.module';
@Module({
  imports: [
    UsersModule,
    RolesModule,
    RouterModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const JWT_config = configService.get("JWT");
        return {
          //jwt的加密key
          secret: JWT_config.key,
          //token过期时间
          signOptions: { expiresIn: JWT_config.time??'6000s' },
          global: true
        }
      }
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule { }
