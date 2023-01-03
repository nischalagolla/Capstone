import { Controller, Post } from '@nestjs/common';
import { Body, Param, Put, Req, UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { ApiParam, PartialType } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles/role.decorator';
import { RolesGuard } from 'src/auth/roles/role.gaurd';
import { AirlineService } from './airline.service';
import { addAirlineDTO } from './dto/addairline.dto';
import { updateAirlineDTO } from './dto/updateAirline.dto';

@Controller()
export class AirlineController {
constructor(private _AirlineService:AirlineService){

}
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('admin')
@Post('add/v1/airline')
add(@Body() addairline:addAirlineDTO){
  const addairlines= this._AirlineService.addairline(addairline);
  return addairlines;
 }

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('admin')
@Put('update/v1/airline/:id')
update(@Param('id') id:number, @Body() updateAirline:updateAirlineDTO){
  console.log(id);
  const updateAirlines= this._AirlineService.updateAirLine(id, updateAirline);
  return updateAirlines;
}

}
