import { Body, Controller, Get, HttpStatus, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { createFlightDTO } from './dto/createFlight.dto';
import { SearchFlightDTO } from './dto/Searchflight.dto';
import { FlightbookService } from './flightbook.service';
import {BookingDto} from './dto/booking.dto'
import { RolesGuard } from 'src/auth/roles/role.gaurd';
import { Roles } from 'src/auth/roles/role.decorator';
import { AuthGuard } from '@nestjs/passport';


@Controller()
export class FlightbookController {

constructor(private _flighservice:FlightbookService){}

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('admin')
@Post('/create')
createflight(@Body() create:createFlightDTO){
return this._flighservice.createflight(create)
}

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('user')
@Get('/search')
 searchFlight(@Body() search:SearchFlightDTO){
return this._flighservice.searchFlight(search)
}

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('user')
@Post('/booking')
 bookFlight(@Body() booking:BookingDto){
 return this._flighservice.bookflight(booking)
}

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('user')
@Get('history/:emailId')
async bookingHistory(@Param('emailId') emailId:string){
return this._flighservice.bookingHistory(emailId)
}

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('user')
@Get('ticket/:pnr')
async ticketDetails(@Param('pnr') pnr:number){
return this._flighservice.ticketDetails(pnr)
}

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('user')
@Put('cancel/:pnr')
async cancelTicket(@Param('pnr') pnr:number){
return  await this._flighservice.cancelTicket(pnr);

}



}
