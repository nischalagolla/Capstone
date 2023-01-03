import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlightEntity } from 'src/flightbook/entity/flightbook.entity';
import { AirlineController } from './airline.controller';
import { AirlineService } from './airline.service';
import { Airline } from './entity/airline.entity';

describe('AirlineService', () => {
  let service: AirlineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root@',
        database: 'flightbooking', 
        autoLoadEntities: true
       // synchronize: true 
      }),TypeOrmModule.forFeature([FlightEntity,Airline])],
      controllers: [AirlineController],
      providers:[AirlineService]

    }).compile();

    service = module.get<AirlineService>(AirlineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
