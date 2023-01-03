import { Airline } from "src/airline/entity/airline.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('flight')
export class FlightEntity {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    flight_number:string

    @Column()
    from_place:string

    @Column()
    to_place:string

    @Column()
    start_time:string

    @Column()
    end_time:string

    @Column()
    total_num_of_business_class_seats:string


    @Column()
    total_num_of_non_business_class_seats:string;

    @Column()
    ticket_cost:string
    
    @Column()
    total_no_of_seats:string

    @Column()
    meal:string
   
    @ManyToOne(type=>Airline,airline=>airline.id,{
        nullable: true,
        cascade: true,
    })
    airline_id:Airline

}
