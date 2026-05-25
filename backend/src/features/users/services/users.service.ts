import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/users.repository';
import { ResponseApi } from 'src/utils/models/responseApi.model';
import { User } from 'src/database/models/user';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async find(companyId: string): Promise<ResponseApi<User[] | null>> {
    if (!companyId) {
      return {
        statusCode: 400,
        message: 'Company ID is required',
        data: null,
      };
    }
    return await this.usersRepository
      .find(companyId)
      .then(([data, count]: [User[], number]) => {
        return {
          statusCode: 200,
          message: 'User found',
          data,
          count,
        };
      })
      .catch((error: Error) => {
        return {
          statusCode: 500,
          message: 'An error occurred while fetching user: ' + error.message,
          data: null,
        };
      });
  }
  async findAll(user: User): Promise<ResponseApi<User[] | null>> {
    return await this.usersRepository
      .findAll(user)
      .then(([data, count]: [User[], number]) => {
        return {
          statusCode: 200,
          message: 'Users found',
          data,
          count,
        };
      })
      .catch((error: Error) => {
        return {
          statusCode: 500,
          message: 'An error occurred while fetching users: ' + error.message,
          data: null,
        };
      });
  }
  async create(user: User): Promise<ResponseApi<User | null>> {
    if (
      !user ||
      !user.name ||
      !user.email ||
      !user.password ||
      !user.companyId
    ) {
      return {
        statusCode: 400,
        message: 'User data is required',
        data: null,
      };
    }
    return await this.usersRepository
      .create(user)
      .then((data: User) => {
        return {
          statusCode: 201,
          message: 'User created',
          data,
        };
      })
      .catch((error: Error) => {
        return {
          statusCode: 500,
          message: 'An error occurred while creating user: ' + error.message,
          data: null,
        };
      });
  }

  async update(user: User): Promise<ResponseApi<User | null>> {
    return await this.usersRepository
      .update(user)
      .then((data: User | null) => {
        if (!data) {
          return {
            statusCode: 404,
            message: 'User not found',
            data: null,
          };
        }
        return {
          statusCode: 201,
          message: 'User Updated',
          data,
        };
      })
      .catch((error: Error) => {
        return {
          statusCode: 500,
          message: 'An error occurred while updating user: ' + error.message,
          data: null,
        };
      });
  }
  async delete(userId: string): Promise<ResponseApi<User | null>> {
    if (!userId) {
      return {
        statusCode: 400,
        message: 'User ID is required',
        data: null,
      };
    }
    return await this.usersRepository
      .delete(userId)
      .then((data: User | null) => {
        if (!data) {
          return {
            statusCode: 404,
            message: 'User not found',
            data: null,
          };
        }
        return {
          statusCode: 201,
          message: 'User deleted',
          data,
        };
      })
      .catch((error: Error) => {
        return {
          statusCode: 500,
          message: 'An error occurred while deleting user: ' + error.message,
          data: null,
        };
      });
  }
}
