import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { User } from './user';
import { Machine } from './machine';

@Entity({
  database: 'enterprise_hub_nest',
  schema: 'public',
  name: 'companies',
})
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  cnpj!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany(() => User, (user) => user.company)
  users!: User[];

  @OneToMany(() => Machine, (machine) => machine.company)
  machines!: Machine[];
}
