import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export abstract class BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@CreateDateColumn({ nullable: false, update: false })
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@Column({ type: 'varchar', nullable: true, update: false })
	createBy: string;

	@Column({ type: 'varchar', nullable: true })
	updatedBy: string;
}