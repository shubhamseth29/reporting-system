import { ApiProperty } from '@nestjs/swagger';

export class ReportDto {
  @ApiProperty()
  resourceName: string;

  @ApiProperty()
  accountId: number;

  @ApiProperty()
  region: string;
}
