import { Body, Controller, Get, Param, Post, Req ,UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import {userDTO} from './dto/users.dto';
import { loginDTO } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { changepassDTO } from './dto/changepass.dto';
import { forgotpasswordDTO } from './dto/forgotpass.dto';
import { Roles } from 'src/auth/roles/role.decorator';
import { Role } from 'src/auth/roles/role.enum';
import { RolesGuard } from 'src/auth/roles/role.gaurd';

@Controller('airline')
export class UsersController {
    constructor(public _UsersService:UsersService){}

@Post('/register')
register(@Body() reguser:userDTO){
const save= this._UsersService.saveuser(reguser);
return save;
}
}
