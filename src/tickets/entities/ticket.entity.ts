import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  playerMobile: string;

  @Column({ nullable: true })
  playerName: string;

  @Column({ unique: true })
  @Index()
  ticket: string;

  @Column({ nullable: true })
  created: string;

  @Column()
  @CreateDateColumn()
  created_at?: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  @DeleteDateColumn()
  deleted_at: Date;
}
