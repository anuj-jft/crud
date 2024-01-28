import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./Base.entity";
import { Role } from "./Role.entity";
import { User } from "./User.entity";

@Entity()
export class Donation extends BaseEntity {
	
	@Column({ type: 'varchar', nullable: false })
	name: string;
	
	@Column({ type: 'varchar', nullable: true, unique: false })
	email: string;

	@Column({ type: 'varchar', nullable: true, unique: false })
	mobile: string;

	@Column({ type: 'varchar', nullable: true, unique: false })
	whatsapp: string;
	
	@Column({ type: 'boolean', nullable: true, default: false })
	isDeleted: boolean;
	
	@Column({ type: 'datetime', nullable: true })
	lastLogin: Date;
	
	@Column({ type: 'varchar', nullable: true })
	city: string;
	
	@Column({ type: 'varchar', nullable: true })
	country: string;
	
	@Column({ type: 'varchar', nullable: false, default: '0'})
	donation: string;

	@Column({ type: 'varchar', nullable: false, default: 'pending'})
	status: string;

	@Column({ type: 'varchar', nullable: false})
	orderId: string;

	@ManyToOne(() => User, user => user.id)
	userId: string;
}