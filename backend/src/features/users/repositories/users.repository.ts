import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/models/user';
import { Repository } from 'typeorm';
import { rlsRepo } from 'src/database/rls/rls.context';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  private get repo(): Repository<User> {
    return rlsRepo(this.usersRepository, User);
  }

  async find(companyId: string): Promise<[User[], number]> {
    return await this.repo.findAndCount({
      where: { companyId },
    });
  }

  async findAll(user: User): Promise<[User[], number]> {
    return await this.repo.findAndCount({
      where: { companyId: user.companyId },
    });
  }

  async create(user: Partial<User>): Promise<User> {
    const entity = this.repo.create(user);
    return await this.repo.save(entity);
  }

  async update(user: Partial<User>): Promise<User | null> {
    if (!user.id) {
      return null;
    }
    return await this.repo.update(user.id, user).then(() => {
      return this.repo.findOne({ where: { id: user.id } });
    });
  }

  async delete(userId: string): Promise<User | null> {
    const entity = await this.repo.findOne({
      where: { id: userId },
    });
    if (!entity) {
      return null;
    }
    return await this.repo.remove(entity);
  }
}
