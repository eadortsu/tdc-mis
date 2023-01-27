import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  transaction_id: string;

  @Column({ nullable: true })
  playerName: string;

  @Column({ nullable: true })
  mobile: string;

  @Column({ nullable: true })
  network: string;

  @Column({ nullable: true })
  number_of_tickets: string;

  @Column({ nullable: true })
  amount: string;

  @Column({ nullable: true })
  date: string;

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
