import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Company } from './company';

@Entity({
  database: 'enterprise_hub_nest',
  schema: 'public',
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ default: 'USER', enum: ['ADMIN', 'USER'] })
  role!: string;

  @Column()
  companyId!: string;

  @ManyToOne(() => Company, (company) => company.users, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'companyId' })
  company!: Company;

  @CreateDateColumn()
  createdAt!: Date;
}
