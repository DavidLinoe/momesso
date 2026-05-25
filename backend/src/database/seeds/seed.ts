import 'reflect-metadata';
import * as dotenv from 'dotenv';
dotenv.config();

import { AppDataSource } from '../config/data-source';
import { Company } from '../models/company';
import { User } from '../models/user';
import { Machine } from '../models/machine';

async function run(): Promise<void> {
  const ds = await AppDataSource.initialize();
  try {
    await ds.transaction(async (manager) => {
      await manager.query(
        `SELECT set_config('app.current_user_role', 'SYSTEM', true)`,
      );
      await manager.query(
        `SELECT set_config('app.current_user_company_id', '', true)`,
      );

      const companies = manager.getRepository(Company);
      const users = manager.getRepository(User);
      const machines = manager.getRepository(Machine);

      const acme = await companies.save(
        companies.create({ name: 'ACME Corp', cnpj: '11.111.111/0001-11' }),
      );
      const globex = await companies.save(
        companies.create({ name: 'Globex', cnpj: '22.222.222/0001-22' }),
      );

      await users.save([
        users.create({
          name: 'Admin',
          email: 'admin@admin.com',
          password: 'admin123',
          role: 'ADMIN',
          companyId: acme.id,
        }),
        users.create({
          name: 'Acme User',
          email: 'user@acme.com',
          password: 'user123',
          role: 'USER',
          companyId: acme.id,
        }),
        users.create({
          name: 'Globex User',
          email: 'user@globex.com',
          password: 'user123',
          role: 'USER',
          companyId: globex.id,
        }),
      ]);

      await machines.save([
        machines.create({
          name: 'Press-01',
          serialNumber: 'ACME-001',
          companyId: acme.id,
        }),
        machines.create({
          name: 'Lathe-02',
          serialNumber: 'ACME-002',
          companyId: acme.id,
        }),
        machines.create({
          name: 'Drill-01',
          serialNumber: 'GLBX-001',
          companyId: globex.id,
        }),
      ]);
    });

    console.log('Seed completed.');
  } finally {
    await ds.destroy();
  }
}

run().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
