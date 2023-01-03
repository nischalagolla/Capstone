import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Airline } from 'src/airline/entity/airline.entity';
import { FlightbookController } from './flightbook.controller';
import {  FlightEntity } from './entity/flightbook.entity';
import { FlightbookService } from './flightbook.service';
import { Booking } from './entity/booking.entity';
import { passenger } from './entity/passengers.entity';

@Module({
  imports:[TypeOrmModule.forFeature([FlightEntity,Airline,Booking,passenger])],
  exports:[TypeOrmModule,FlightbookService],
  controllers: [FlightbookController],
  providers: [FlightbookService]
})
export class FlightbookModule {}
