import { MigrationInterface, QueryRunner } from 'typeorm';

export class Rls1779549902561 implements MigrationInterface {
  name = 'Rls1779549902561';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "companies" ENABLE ROW LEVEL SECURITY`,
    );
    await queryRunner.query(`ALTER TABLE "companies" FORCE ROW LEVEL SECURITY`);
    await queryRunner.query(`ALTER TABLE "users" ENABLE ROW LEVEL SECURITY`);
    await queryRunner.query(`ALTER TABLE "users" FORCE ROW LEVEL SECURITY`);
    await queryRunner.query(`ALTER TABLE "machines" ENABLE ROW LEVEL SECURITY`);
    await queryRunner.query(`ALTER TABLE "machines" FORCE ROW LEVEL SECURITY`);

    await queryRunner.query(`
      CREATE POLICY companies_access ON "companies"
      USING (
        current_setting('app.current_user_role', true) IN ('ADMIN', 'SYSTEM')
        OR (
          current_setting('app.current_user_role', true) = 'USER'
          AND "id"::text = current_setting('app.current_user_company_id', true)
        )
      )
      WITH CHECK (
        current_setting('app.current_user_role', true) IN ('ADMIN', 'SYSTEM')
      )
    `);

    await queryRunner.query(`
      CREATE POLICY users_access ON "users"
      USING (
        current_setting('app.current_user_role', true) IN ('ADMIN', 'SYSTEM')
        OR (
          current_setting('app.current_user_role', true) = 'USER'
          AND "companyId"::text = current_setting('app.current_user_company_id', true)
        )
      )
      WITH CHECK (
        current_setting('app.current_user_role', true) IN ('ADMIN', 'SYSTEM')
        OR (
          current_setting('app.current_user_role', true) = 'USER'
          AND "companyId"::text = current_setting('app.current_user_company_id', true)
        )
      )
    `);

    await queryRunner.query(`
      CREATE POLICY machines_access ON "machines"
      USING (
        current_setting('app.current_user_role', true) IN ('ADMIN', 'SYSTEM')
        OR (
          current_setting('app.current_user_role', true) = 'USER'
          AND "companyId"::text = current_setting('app.current_user_company_id', true)
        )
      )
      WITH CHECK (
        current_setting('app.current_user_role', true) IN ('ADMIN', 'SYSTEM')
        OR (
          current_setting('app.current_user_role', true) = 'USER'
          AND "companyId"::text = current_setting('app.current_user_company_id', true)
        )
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP POLICY IF EXISTS machines_access ON "machines"`,
    );
    await queryRunner.query(`DROP POLICY IF EXISTS users_access ON "users"`);
    await queryRunner.query(
      `DROP POLICY IF EXISTS companies_access ON "companies"`,
    );
    await queryRunner.query(
      `ALTER TABLE "machines" DISABLE ROW LEVEL SECURITY`,
    );
    await queryRunner.query(`ALTER TABLE "users" DISABLE ROW LEVEL SECURITY`);
    await queryRunner.query(
      `ALTER TABLE "companies" DISABLE ROW LEVEL SECURITY`,
    );
  }
}
