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
  name: 'machines',
})
export class Machine {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  serialNumber!: string;

  @Column()
  companyId!: string;

  @ManyToOne(() => Company, (company) => company.machines, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'companyId' })
  company!: Company;

  @CreateDateColumn()
  createdAt!: Date;
}
