import { HttpException, BadRequestException, HttpStatus, Injectable  } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { userDTO } from 'src/users/dto/users.dto';
import { loginDTO } from 'src/users/dto/login.dto';
import { adminDto } from 'src/admin/admin.dto';
import { AdminService } from 'src/admin/admin.service';
import { changepassDTO } from 'src/users/dto/changepass.dto';

@Injectable()
export class AuthService {
    constructor(public AdminService: AdminService, public UsersService:UsersService,public JwtService:JwtService
){}

    async validateUser(username: string, pass: string): Promise<any> {
           const founduser= await this.UsersService.usercheck(username)
            if (!founduser) {
                throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);    
            }
            if (founduser && founduser.password === pass) {
                return founduser;
              }
              return null;
             }

    async validateAdmin(admin: adminDto): Promise<any> {
        let validAdmin = await this.AdminService.validAdminCred(admin.username, admin.password);
        if (validAdmin) {

            const { username, password } = validAdmin;

            return { username, password };
        }
        throw new BadRequestException("Admin is not valid");

    }

    async generatetoken(user: loginDTO) {
        const { username } = user;
        const payload = { username };
        const token = await this.JwtService.sign(payload);
        return { token: token }
    }

    generateToken(admin:adminDto):any{
        const {username} = admin;
        const payload = {username};
        const token = this.JwtService.sign(payload);
        return {token: token};
    }
}
