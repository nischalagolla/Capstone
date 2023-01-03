import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppClusterService } from './app.service';
import { DataSource } from 'typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/users.entity';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from './auth/constants';
import { AuthController } from './auth/auth.controller';
import { RolesGuard } from './auth/roles/role.gaurd';
import { APP_GUARD } from '@nestjs/core';
import { AirlineModule } from './airline/airline.module';
import { AirlineController } from './airline/airline.controller';
import { Airline } from './airline/entity/airline.entity';
import { FlightEntity } from './flightbook/entity/flightbook.entity';
import { FlightbookModule } from './flightbook/flightbook.module';


@Module({
  imports: [TypeOrmModule.forRoot({

    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'flightbooking',
    entities: [FlightEntity,User,Airline],
    synchronize :true, 
    //autoLoadEntities:true   
  }), forwardRef(()=>UsersModule) ,forwardRef(()=>AuthModule), AirlineModule , FlightbookModule
],
  controllers: [AppController],
  providers: [AppClusterService],
})
export class AppModule {
  constructor(private dataSource: DataSource){}
}
