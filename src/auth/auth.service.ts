import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) { }

  async validateUser(username: string, pass: string): Promise<any> {
    console.log(2222);
    
    const user = await this.usersService.findOne({ username });
    if (user && user.password === pass) {
      const { password, ...result } = user;
      console.log(result, 'result');
      return result;
    }
    return null;
  }

  async login(user: any) {
    console.log(1111111);
    const payload = { username: user.username, password: user.password };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}