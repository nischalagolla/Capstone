import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { passenger } from "./passengers.entity";

@Entity('booking')
export class Booking {
    @PrimaryGeneratedColumn()
    pnr: number;
    @Column()
    flight_id: number;

    @Column()
    booked_by: string;

    @Column()
    emailId: string;
    
    @Column()
    number_of_seats: string;

    @Column()
    selected_meal: string;

    @Column({nullable:true})
    selected_seat_number: string;

    @Column({default:'active'})
    status: string;

    @ManyToMany(type=>passenger, passenger => passenger.id,{
        cascade:true
    })
    @JoinTable()
    passengers:passenger[];

}
