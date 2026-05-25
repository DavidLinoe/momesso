import { ApiProperty } from '@nestjs/swagger';

export class UpdateMachinesDto {
  @ApiProperty({
    example: '495b2416-05d4-4e4f-9d0f-01a8d4a73ff0',
    description: 'UUID of the machine to update',
  })
  id!: string;

  @ApiProperty({ example: 'Injetora 500T', required: false })
  name?: string;

  @ApiProperty({ example: 'SN-2026-0001', required: false })
  serialNumber?: string;

  @ApiProperty({
    example: 'a0514426-7d3e-4c07-b116-3a8dae577e3e',
    description: 'UUID of the company that owns the machine',
    required: false,
  })
  companyId?: string;
}
