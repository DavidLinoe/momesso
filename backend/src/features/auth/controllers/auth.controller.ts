import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { User } from 'src/database/models/user';
import type { ResponseApi } from 'src/utils/models/responseApi.model';
import { LoginDto } from '../dtos/login.dto';
import { RegisterDto } from '../dtos/register.dto';
import { Public } from 'src/utils/decorators/public.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Authenticate a user' })
  @ApiBody({ type: LoginDto })
  async login(
    @Body() credentials: LoginDto,
  ): Promise<ResponseApi<User | null>> {
    return await this.authService.login(credentials);
  }

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Create a new Admin user' })
  @ApiBody({ type: RegisterDto })
  async register(
    @Body() createAuthDto: RegisterDto,
  ): Promise<ResponseApi<User | null>> {
    return await this.authService.register(createAuthDto);
  }
}
