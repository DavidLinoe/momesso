import { ApiProperty } from '@nestjs/swagger';

export class CreateCompaniesDto {
  @ApiProperty({
    example: 'a0514426-7d3e-4c07-b116-3a8dae577e3e',
    description: 'UUID of the company to which the user belongs',
  })
  id!: string;

  @ApiProperty({ example: 'Empresa Teste' })
  name!: string;

  @ApiProperty({ example: '12345678901234' })
  cnpj!: string;
}
