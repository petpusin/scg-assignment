import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Contact } from "./contact.entity";

@Entity('groups')
export class Group {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'varchar'
    })
    name: string

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToMany(() => Contact, (contact) => contact.group)
    contact: Contact[]
}