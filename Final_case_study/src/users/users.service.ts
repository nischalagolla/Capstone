import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { loginDTO } from './dto/login.dto';
import { userDTO } from './dto/users.dto';
import { User } from './users.entity';

@Injectable()
export class UsersService {
constructor(@InjectRepository(User) 
private usersRepository: Repository<User>){}

async saveuser(user:userDTO):Promise<userDTO>{
const reguser= await this.usersRepository.save(user);
return reguser;
}  
async findOne(username:string):Promise<loginDTO>{
return await this.usersRepository.findOne({ where: { username } });
}

async changepassword(email:string,password:string, newpassword:string){
const founduser= await this.usersRepository.find({ where: { email ,password} });
if(founduser.length>0){
    return await this.usersRepository.update(email, {password:newpassword}); 
}
else{ 
    throw new HttpException("Email or password incorrect",HttpStatus.BAD_REQUEST)
}}

async forgotpassword(email:string,username:string, resetpassword:string){
    const founduser= await this.usersRepository.find({ where: { email ,username} });
    if(founduser.length>0){
        return await this.usersRepository.update(email, {password:resetpassword}); 
    }
    else{ 
        throw new HttpException("Email or username incorrect",HttpStatus.BAD_REQUEST);
    }}
}
  