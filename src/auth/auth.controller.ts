import { Controller, Post, UseGuards,Body, Req, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import cluster from 'cluster';
import { userDTO } from 'src/users/dto/users.dto';
import { loginDTO } from '../users/dto/login.dto';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
    constructor(public _AuthService:AuthService){}

@Post('/app/v1/flight/admin/login')
@UseGuards(AuthGuard('local'))
async gettoken(@Body() user:loginDTO, @Req() req:Request){
    const token=await this._AuthService.generatetoken(user);
    cluster.worker.kill();
    return token;
}

@UseGuards(AuthGuard("jwt"))
  @Get('/user')
  getProfile(@Req() req:Request) {
    return req['user'];
  }  
}

