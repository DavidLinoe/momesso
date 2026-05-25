import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from 'src/database/models/company';
import { Repository } from 'typeorm';
import { rlsRepo } from 'src/database/rls/rls.context';

@Injectable()
export class CompaniesRepository {
  constructor(
    @InjectRepository(Company)
    private companiesRepository: Repository<Company>,
  ) {}

  private get repo(): Repository<Company> {
    return rlsRepo(this.companiesRepository, Company);
  }

  async find(userId: string): Promise<[Company[], number]> {
    return await this.repo.findAndCount({
      where: { users: { id: userId } },
    });
  }

  async create(company: Partial<Company>): Promise<Company> {
    const entity = this.repo.create(company);
    return await this.repo.save(entity);
  }

  async update(company: Partial<Company>): Promise<Company | null> {
    if (!company.id) {
      return null;
    }
    return await this.repo.update(company.id, company).then(() => {
      return this.repo.findOne({ where: { id: company.id } });
    });
  }

  async delete(companyId: string): Promise<Company | null> {
    const entity = await this.repo.findOne({
      where: { id: companyId },
    });
    if (!entity) {
      return null;
    }
    return await this.repo.remove(entity);
  }
}
