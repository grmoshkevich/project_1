import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(username, pass) {
    console.log('%c⧭', 'color: #00e600', 'heyy');
    const user = await this.usersService.findOne(username);
    console.log('%c⧭', 'color: #00a3cc', user);
    if (user?.password !== pass) {
      console.log('%c⧭', 'color: #aa00ff', 'here');
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };
    console.log('%c⧭now here', 'color: #e50000', payload);

    console.log('%c⧭', 'color: #733d00', 'returning');
    return {
      accesss_token: await this.jwtService.signAsync(payload),
    };
  }
}
