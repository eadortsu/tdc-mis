import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('winning_tickets')
export class WinningTicket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  drawID: string;

  @Column({ nullable: true })
  drawName: string;

  @Column({ nullable: true })
  drawDate: string;

  @Column({ nullable: true })
  prizeCategory: string;

  @Column({ nullable: true })
  mobile: string;

  @Column({ nullable: true })
  playerName: string;

  @Column({ unique: true })
  @Index()
  ticket: string;

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
