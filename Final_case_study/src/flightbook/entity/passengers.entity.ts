import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Booking } from "./booking.entity";

@Entity('passenger')
export class passenger {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string;

    @Column()
    gender:string;

    @Column()
    age:number;

    @ManyToMany(type=>Booking,booking =>booking.passengers)
    bookings:Booking[]

    
}
