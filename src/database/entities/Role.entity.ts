import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./Base.entity";
import { User } from "./User.entity";
import { UserTypes } from "../enums/user-type.enum";

@Entity()
export class Role extends BaseEntity {
	@Column({ type: 'varchar', nullable: false })
	role: UserTypes;

	@OneToMany(() => User, user => user.role)
	user: User[];
}