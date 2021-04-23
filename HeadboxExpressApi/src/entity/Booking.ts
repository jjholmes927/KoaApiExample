import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique} from "typeorm";
import { Guest } from "./Guest";
import { Venue } from "./Venue";

@Entity()
@Unique('BookingUniqueConstraint', ['date', 'guest', 'venue']) 
export class Booking {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;

    @Column()
    numberOfGuests: number;

    @Column("double")
    price: number;

    @Column({ default: "£"})
    priceCurrency: string;

    @Column()
    eventType: string;

    @Column()
    status: string;

    @ManyToOne(() => Guest, guest => guest.bookings)
    guest: Guest;

    @ManyToOne(() => Venue, venue => venue.bookings)
    venue: Venue;
}
