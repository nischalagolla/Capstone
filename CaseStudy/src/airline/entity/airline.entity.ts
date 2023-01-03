import { FlightEntity } from '../../flightbook/entity/flightbook.entity';
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, OneToMany} from 'typeorm';

@Entity()
export class Airline {

@PrimaryGeneratedColumn('increment')
id: number;

@Column()
name: string;
 
@Column({default: "No"})
blocked: string;

@OneToMany(type=>FlightEntity,flight=>flight.airline_id)
flights:FlightEntity[] 
}

