import { Injectable } from '@nestjs/common';
import { AuthRepository } from '../repositories/auth.repository';
import { User } from 'src/database/models/user';
import { ResponseApi } from 'src/utils/models/responseApi.model';
import { RegisterDto } from '../dtos/register.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}

  async login(user: Partial<User>): Promise<ResponseApi<User | null>> {
    if (!user || !user.email || !user.password) {
      return {
        statusCode: 400,
        message: 'Email and password are required',
        data: null,
      };
    }

    return await this.authRepository
      .login(user)
      .then(async (data: User | null) => {
        if (!data) {
          return {
            statusCode: 401,
            message: 'Invalid email or password',
            data: null,
          };
        }
        return {
          statusCode: 200,
          message: 'Login successful',
          data: {
            ...data,
            token: await this.jwtService.signAsync({
              companyId: data.companyId,
              userId: data.id,
              role: data.role,
            }),
          },
        };
      })
      .catch((error: Error) => {
        return {
          statusCode: 500,
          message: 'An error occurred during login: ' + error.message,
          data: null,
        };
      });
  }

  async register(user: RegisterDto): Promise<ResponseApi<User | null>> {
    if (
      !user ||
      !user.email ||
      !user.password ||
      !user.name ||
      !user.role ||
      !user.companyId
    ) {
      return {
        statusCode: 400,
        message: 'All fields are required',
        data: null,
      };
    }
    return await this.authRepository
      .register(user)
      .then((data: User) => {
        return {
          statusCode: 200,
          message: 'User registered successfully',
          data,
        };
      })
      .catch((error: Error) => {
        return {
          statusCode: 500,
          message: 'An error occurred during registration: ' + error.message,
          data: null,
        };
      });
  }
}
