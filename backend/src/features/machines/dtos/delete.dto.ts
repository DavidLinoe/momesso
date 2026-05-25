import { ApiProperty } from '@nestjs/swagger';

export class DeleteMachinesDto {
  @ApiProperty({
    example: '495b2416-05d4-4e4f-9d0f-01a8d4a73ff0',
    description: 'UUID of the machine to delete',
  })
  machineId!: string;
}
