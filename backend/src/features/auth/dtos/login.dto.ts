import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'admin@empresa.com',
    description: 'E-mail',
  })
  email!: string;

  @ApiProperty({ example: 'senha123', description: 'Password' })
  password!: string;
}
