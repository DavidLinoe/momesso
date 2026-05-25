import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/models/user';
import { Repository } from 'typeorm';
import { rlsRepo } from 'src/database/rls/rls.context';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  private get repo(): Repository<User> {
    return rlsRepo(this.usersRepository, User);
  }

  async login(user: Partial<User>): Promise<User | null> {
    return await this.repo.findOne({
      where: {
        email: user.email,
        password: user.password,
      },
    });
  }

  async register(user: Partial<User>): Promise<User> {
    const entity = this.repo.create(user);
    return await this.repo.save(entity);
  }
}
