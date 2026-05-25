import { ApiProperty } from '@nestjs/swagger';

export class UpdateCompaniesDto {
  @ApiProperty({ example: 'Empresa Teste Update' })
  name!: string;

  @ApiProperty({ example: '12345678901234' })
  cnpj!: string;

  @ApiProperty({
    example: '495b2416-05d4-4e4f-9d0f-01a8d4a73ff0',
    description: 'UUID of the company to update',
  })
  companyId!: string;
}
