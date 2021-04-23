import {Entity, PrimaryGeneratedColumn, Column, ManyToMany} from "typeorm";
import { Venue } from "./Venue";

@Entity()
export class Space {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;
    
    @ManyToMany(() => Venue, venue => venue.spaces)
    venues: Venue[]
}