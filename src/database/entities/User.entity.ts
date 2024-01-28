import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./Base.entity";
import { Role } from "./Role.entity";
import { Donation } from "./Donation.entity";

@Entity()
export class User extends BaseEntity {
	@Column({ type: 'varchar', nullable: false })
	fname: string;

	@Column({ type: 'varchar', nullable: true, default: '' })
	lname: string;

	@Column({ type: 'varchar', nullable: true, unique: true })
	email: string;

	@Column({ type: 'varchar', nullable: true, unique: true })
	mobile: string;

	@Column({ type: 'varchar', nullable: true, unique: true })
	whatsapp: string;

	@Column({ type: 'varchar', nullable: true, default: 'male'})
	gender: string;

	@Column({ type: 'varchar', nullable: false, default: '50'})
	promisedAmount: string;

	@Column({ type: 'varchar', nullable: true,  })
	password: string;

	@Column({ type: 'boolean', nullable: true, default: false })
	isDeleted: boolean;

	@Column({ type: 'datetime', nullable: true })
	lastLogin: Date;

	@Column({ type: 'varchar', nullable: true })
	city: string;

	@ManyToOne(() => Role, role => role.user, { eager: true })
	@JoinColumn({ name: 'role' })
	role: Role;

	@OneToMany(() => Donation, donation => donation.id)
    donation: Donation[];
}