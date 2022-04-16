import { Body, Controller, Get, Header, Param, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { ReportDto } from '../../dto/report';
import { ExcelReportService } from '../services/excel-report.service';

@Controller('excel-report')
export class ExcelReportController {
  constructor(private readonly excelReportService: ExcelReportService) {}

  @ApiCreatedResponse({ description: 'Create report in excel format' })
  @ApiBody({ type: ReportDto })
  @Post()
  @Header('Content-Type', 'application/json')
  convertJsonToExcel(@Body() data: ReportDto) {
    this.excelReportService.convertJsonToExcel(data);
    return 'Report generated';
  }

  @ApiOkResponse({ description: 'Data extracted from report' })
  @Get(':fileName')
  convertExcelToJson(@Param('fileName') fileName: string) {
    return this.excelReportService.convertExcelToJson(fileName);
  }
}
