import { ApiProperty } from '@nestjs/swagger';

export class FindUsersDto {
  @ApiProperty({
    required: true,
    description: 'Company ID to filter users',
    example: '495b2416-05d4-4e4f-9d0f-01a8d4a73ff0',
  })
  companyId!: string;
}
