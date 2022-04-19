import { Body, Controller, Get, Header, Param, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { context, trace } from '@opentelemetry/api';
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
    const asyncData = this.excelReportService.convertJsonToExcel(data);
    console.log('Should log active span 2');
    const span = trace.getSpan(context.active());
    console.log(span);
    span?.end();
    return asyncData;
  }

  @ApiOkResponse({ description: 'Data extracted from report' })
  @Get(':fileName')
  convertExcelToJson(@Param('fileName') fileName: string) {
    console.log('Should log active span 3');
    const span = trace.getSpan(context.active());
    console.log(span);
    span?.end();
    return this.excelReportService.convertExcelToJson(fileName);
  }
}
