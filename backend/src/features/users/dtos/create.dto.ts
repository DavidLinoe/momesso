import { ApiProperty } from '@nestjs/swagger';

export class CreateUsersDto {
  @ApiProperty({
    example: '495b2416-05d4-4e4f-9d0f-01a8d4a73ff0',
    description: 'UUID of the user to delete',
  })
  id!: string;

  @ApiProperty({ example: 'David Lino' })
  name!: string;

  @ApiProperty({ example: 'david@empresa.com' })
  email!: string;

  @ApiProperty({ example: 'senha123', minLength: 6 })
  password!: string;

  @ApiProperty({ example: 'USER', enum: ['ADMIN', 'USER'] })
  role!: string;

  @ApiProperty({
    example: 'a0514426-7d3e-4c07-b116-3a8dae577e3e',
    description: 'UUID of the company to which the user belongs',
  })
  companyId!: string;
}
