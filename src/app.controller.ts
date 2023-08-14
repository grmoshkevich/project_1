import { Controller, Request, Get, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    console.log('%c⧭', 'color: #ffa640', 'user' in req);
    return req.user;
  }

  // @UseGuards(LocalAuthGuard)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
