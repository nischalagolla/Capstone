import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { create } from 'domain';
import { FlightEntity } from 'src/flightbook/entity/flightbook.entity';
import { AirlineController } from './airline.controller';
import { AirlineService } from './airline.service';
import { addAirlineDTO } from './dto/addairline.dto';
import { updateAirlineDTO } from './dto/updateAirline.dto';
import { Airline } from './entity/airline.entity';

describe('AirlineController', () => {

  let controller: AirlineController;
  let service:AirlineService

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

    controller = module.get<AirlineController>(AirlineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it("should be able to add airline", async ()=>{
   
    const result:Promise<any> = new Promise((resolve, reject)=>{
      resolve({"name":"indigo",
          "id":'1',
          "blocked":"no"})
    });
    jest.spyOn(service, 'addairline').mockImplementation(() => result);
    let airlines:Airline = await controller.add({
      "name":"indigo"
    });
    expect(airlines).toBeTruthy()
  })

  it("should be able to update airline", async ()=>{
   
    const result:Promise<any> = new Promise((resolve, reject)=>{
      resolve({ "name":"indigojet",
          "blocked":"yes",
          "id":1
        })
    });
    jest.spyOn(service, 'updateAirLine').mockImplementation(() => result);
    let updateairlines:Airline = await controller.update(1,{"name":"indigojet",
    "blocked":"yes",
    "id":1})
    expect(updateairlines).toBeTruthy()
  })
});



