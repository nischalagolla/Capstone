import { UnauthorizedException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { userDTO } from 'src/users/dto/users.dto';
import { loginDTO } from 'src/users/dto/login.dto';
import { changepassDTO } from 'src/users/dto/changepass.dto';

@Injectable()
export class AuthService {
    constructor(private readonly UsersService: UsersService, private readonly JwtService: JwtService
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        let founduser = await this.UsersService.findOne(username)
        if (!founduser) {
            throw new UnauthorizedException("User is not valid");
        }
        if (founduser && founduser.password === pass) {
            return founduser;
        }
    }

    async generatetoken(user: loginDTO) {
        const { username } = user;
        const payload = { username };
        const token = await this.JwtService.sign(payload);
        return { token: token }
    }

}
