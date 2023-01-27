import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('players')
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  otherName: string;

  @Column({ unique: true })
  mobile: string;

  @Column({ nullable: true })
  promotionalConsent: boolean;

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
