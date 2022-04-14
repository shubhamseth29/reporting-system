import { Module } from '@nestjs/common';
import { ExcelReportController } from './controllers/excel-report.controller';
import { ExcelReportService } from './services/excel-report.service';

@Module({
  providers: [ExcelReportService],
  controllers: [ExcelReportController],
})
export class ExcelReportModule {}
