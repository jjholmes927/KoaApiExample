import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, JoinTable} from "typeorm";
import { Space } from './Space';
import { Booking } from "./Booking";

@Entity()
export class Venue {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique : true})
    name: string;
  
    @ManyToMany(() => Space)
    @JoinTable()
    spaces: Space[];
ß
    @OneToMany(() => Booking, booking => booking.venue)
    bookings: Booking[];
}