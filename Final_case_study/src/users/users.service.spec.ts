import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { UsersController } from './users.controller';
import { User } from './users.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let Usersservice: UsersService;
  let usersrepository:Repository<User>;
  let Userscontroller:UsersController;


  beforeEach(async () => {
    Usersservice=new UsersService(usersrepository);
    Userscontroller =new UsersController(Usersservice);

    }).compile();
    afterEach(()=>{
      Usersservice=null;
      Userscontroller=null;

  });

  it('should be defined', () => {
    expect(UsersService).toBeDefined();
  });



  
});
