import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Poll {
  @PrimaryGeneratedColumn() id: number;

  @Column({ unique: true })poll_title: string;
  @Column() poll_context: string;
  @Column() createdBy: string;
  @Column({default: false}) is_voted: boolean;
  @Column({default: "null"}) voted_by: string;
  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() uptime: Date;
}