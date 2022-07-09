import { group } from "console";
import { Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Group } from "./group.entity";

@Entity('contacts')
export class Contact {
    @PrimaryGeneratedColumn()
    contactId: number

    @Column({ type: 'varchar', nullable: true, default: "" })
    logo: string

    @Column({ type: 'varchar' })
    firstName: string

    @Column({ type: 'varchar', nullable: true, default: "" })
    lastName: string

    @Column({ type: 'timestamptz' })
    birthDate: Date

    @Column({ type: 'varchar', array: true, default: [] })
    phone: string[]

    @Column({ type: 'varchar', array: true, default: [] })
    email: string[]

    @Column({ type: 'varchar', array: true, default: [] })
    url: string[]

    @DeleteDateColumn()
    deletedAt: Date;

    @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createDateTime: Date

    @Column({ type: 'timestamptz', default: () => "CURRENT_TIMESTAMP" })
    lastChangedDateTime: Date

    @ManyToOne(() => Group, (group) => group.contact)
    group: Group

}