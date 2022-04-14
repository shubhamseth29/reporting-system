import { Body, Controller, Get, Header, Param, Post } from '@nestjs/common';
import { ReportDto } from '../../dto/report';
import { ExcelReportService } from '../services/excel-report.service';

@Controller('excel-report')
export class ExcelReportController {
  constructor(private readonly excelReportService: ExcelReportService) {}

  @Post()
  @Header('Content-Type', 'application/json')
  convertJsonToExcel(@Body() data: ReportDto) {
    this.excelReportService.convertJsonToExcel(data);
    return 'Report generated';
  }

  @Get(':fileName')
  convertExcelToJson(@Param('fileName') fileName: string) {
    return this.excelReportService.convertExcelToJson(fileName);
  }
}
