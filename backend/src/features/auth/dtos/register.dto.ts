import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    example: '0ceb39f9-198b-4f37-890f-f6d405ab9416',
    description: 'UUID of the user being registered',
  })
  id!: string;

  @ApiProperty({ example: 'João da Silva' })
  name!: string;

  @ApiProperty({ example: 'admin@empresa.com' })
  email!: string;

  @ApiProperty({ example: 'senha123', minLength: 6 })
  password!: string;

  @ApiProperty({ example: 'ADMIN', enum: ['ADMIN', 'USER'] })
  role!: string;

  @ApiProperty({
    example: 'a0514426-7d3e-4c07-b116-3a8dae577e3e',
    description: 'UUID of the company to which the user belongs',
  })
  companyId!: string;
}
