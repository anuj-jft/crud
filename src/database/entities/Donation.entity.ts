import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./Base.entity";
import { Role } from "./Role.entity";

@Entity()
export class Donation extends BaseEntity {
	@Column({ type: 'varchar', nullable: false })
	name: string;

	@Column({ type: 'varchar', nullable: true, unique: true })
	email: string;

	@Column({ type: 'varchar', nullable: true, unique: true })
	mobile: string;

	@Column({ type: 'varchar', nullable: true, unique: true })
	whatsapp: string;

	@Column({ type: 'boolean', nullable: true, default: false })
	isDeleted: boolean;

	@Column({ type: 'datetime', nullable: true })
	lastLogin: Date;

	@Column({ type: 'varchar', nullable: false })
	city: string;

	@Column({ type: 'varchar', nullable: false })
	country: string;

	@Column({ type: 'varchar', nullable: false, default: '0'})
	donation: string;
}