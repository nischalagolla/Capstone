import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookingDto } from './dto/booking.dto';
import { createFlightDTO } from './dto/createFlight.dto';
import { SearchFlightDTO } from './dto/Searchflight.dto';
import { Booking } from './entity/booking.entity';
import { FlightEntity } from './entity/flightbook.entity';

@Injectable()
 export class FlightbookService {
constructor(@InjectRepository(FlightEntity) 
private flightRepository: Repository<FlightEntity>,
@InjectRepository(Booking)
private bookingRepository:Repository<Booking>){}


async createflight(repo:createFlightDTO){
    return await this.flightRepository.save(repo);

}

async searchFlight(search:SearchFlightDTO){
    return await this.flightRepository.find({where:{from_place:search.from_place,to_place:search.to_place}})
  }


async bookflight(booking:BookingDto){
     return await this.bookingRepository.save(booking)
  }


async bookingHistory(emailId:string){
    return await this.bookingRepository.find({where:{emailId:emailId},relations:{passengers:true}})
}

async ticketDetails(pnr:number){
    return await this.bookingRepository.find({where:{pnr:pnr},relations:{passengers:true}})

}
async cancelTicket(pnr:number){
    return await this.bookingRepository.update(pnr,{status:'Inactive'})
}

}
