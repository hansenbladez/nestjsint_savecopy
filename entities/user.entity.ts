import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn() id: number;

  @Column({ unique: true })un: string;
  @Column() pw: string;

  @Column({ default: true }) isActive: boolean;
}