import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlightEntity } from 'src/flightbook/entity/flightbook.entity';
import { AirlineController } from './airline.controller';
import { Airline } from './entity/airline.entity';
import { AirlineService } from './airline.service';

@Module({
  imports:[TypeOrmModule.forFeature([Airline,FlightEntity])],
  exports:[TypeOrmModule,AirlineService],
  controllers: [AirlineController],
  providers: [AirlineService]
})
export class AirlineModule {

  
}
