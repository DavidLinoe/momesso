import { ApiProperty } from '@nestjs/swagger';

export class CreateMachinesDto {
  @ApiProperty({ example: 'Injetora 500T' })
  name!: string;

  @ApiProperty({ example: 'SN-2026-0001' })
  serialNumber!: string;

  @ApiProperty({
    example: 'a0514426-7d3e-4c07-b116-3a8dae577e3e',
    description: 'UUID of the company that owns the machine',
  })
  companyId!: string;
}
