import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Airline } from 'src/airline/entity/airline.entity';
import { Booking } from './entity/booking.entity';
import { FlightEntity } from './entity/flightbook.entity';
import { passenger } from './entity/passengers.entity';
import { FlightbookController } from './flightbook.controller';
import { FlightbookService } from './flightbook.service';

describe('FlightbookController', () => {
let controller: FlightbookController;
let service:FlightbookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'pass@word1',
        database: 'flightbooking',
        autoLoadEntities: true,
       // synchronize: true 
      }),TypeOrmModule.forFeature([FlightEntity,Airline,Booking,passenger])],
      controllers: [FlightbookController],
      providers:[FlightbookService]
    }).compile();

    controller = module.get<FlightbookController>(FlightbookController);
    service=module.get<FlightbookService>(FlightbookService)
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it("searchflights", async ()=>{
   
    const result:Promise<any[]> = new Promise((resolve, reject)=>{
      resolve([{ 
        "date": "23/02/2023",
        "from_place": "delhi",
        "to_place": "pune",
        "round_trip": "yes" 
        }])
    });
    jest.spyOn(service, 'searchFlight').mockImplementation(() => result);

    let list:FlightEntity[] = await controller.searchFlight({ 
      "date": "23/02/2023",
      "from_place": "delhi",
      "to_place": "pune",
      "round_trip": "yes" 
      });
    expect(list.length).toBe((await result).length);
  })

  it("should be able to add flights", async ()=>{
   
    const result:Promise<any> = new Promise((resolve, reject)=>{
      resolve({
        "id":"1",
      "flight_number":"234",
      "airline_id":"1",
      "from_place":"delhi",
      "to_place":"hyd",
      "start_time":"10am",
      "end_time":"1pm",
      "total_num_of_business_class_seats":"10",
      "total_num_of_non_business_class_seats":"20",
      "ticket_cost":"5000",
      "total_no_of_seats":"20",
      "meal":"veg"})
    });
    jest.spyOn(service, 'addflight').mockImplementation(() => result);

    let list = await controller.createflight( {
      "id":1,
      "flight_number":"234",
      "airline_id":"1",
      "from_place":"delhi",
      "to_place":"hyd",
      "start_time":"10am",
      "end_time":"1pm",
      "total_num_of_business_class_seats":"10",
      "total_num_of_non_business_class_seats":"20",
      "ticket_cost":"5000",
      "total_no_of_seats":"20",
      "meal":"veg"
      
   });
    expect(list).toBeTruthy()
  })
  it("show booking history", async ()=>{
    const result:Promise<any> = new Promise((resolve, reject)=>{resolve('mike@gmail.com')});
    jest.spyOn(service, 'bookingHistory').mockImplementation(() => result);
    let list:Booking[] = await controller.bookingHistory('mike@gmail.com');
    expect(list).toBeTruthy()
  })

  it("show flight tickets", async ()=>{ 
    const result:Promise<any> = new Promise((resolve, reject)=>{resolve(1) });
    jest.spyOn(service, 'ticketDetails').mockImplementation(() => result);
    let list:Booking[] = await controller.ticketDetails(1);
    expect(list).toBe(1)
  })
});
