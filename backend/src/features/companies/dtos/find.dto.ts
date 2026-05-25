import { ApiProperty } from '@nestjs/swagger';

export class FindCompaniesDto {
  @ApiProperty({
    required: true,
    description: 'User ID to filter companies',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  userId!: string;
}
