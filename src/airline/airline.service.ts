import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Airline } from './entity/airline.entity';
import { addAirlineDTO } from './dto/addairline.dto';
import { updateAirlineDTO } from './dto/updateAirline.dto';


@Injectable()
export class AirlineService {
constructor(@InjectRepository(Airline) 
private airlineRepository: Repository<Airline>){}

async addairline(name:addAirlineDTO){
return await this.airlineRepository.save(name);
}

async updateAirLine(id:number, airlineDetails:updateAirlineDTO){
const name = airlineDetails.name;
const blocked = airlineDetails.blocked;
const foundAirline = await this.airlineRepository.findOne({ where: { id } });
if(foundAirline){
    await this.airlineRepository.update(id, {name:name, blocked:blocked}); 
    return await this.airlineRepository.findOne({ where: { id } });
}
else{ 
    throw new HttpException("Airline Not Found",HttpStatus.BAD_REQUEST);
}}
    
}
