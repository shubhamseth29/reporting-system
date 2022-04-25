import { Body, Controller, Get, Header, Param, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { context, trace } from '@opentelemetry/api';
import { ImplementLogger } from 'src/common/decorators/logger.decorator';
import { LoggerClass } from '../../common/classes/Logger';
import { ReportDto } from '../../dto/report';
import { ExcelReportService } from './../services/excel-report.service';

@Controller('excel-report')
@ImplementLogger
export class ExcelReportController extends LoggerClass {
  constructor(private readonly excelReportService: ExcelReportService) {
    super();
  }

  @ApiCreatedResponse({ description: 'Create report in excel format' })
  @ApiBody({ type: ReportDto })
  @Post()
  @Header('Content-Type', 'application/json')
  convertJsonToExcel(@Body() data: ReportDto) {
    const asyncData = this.excelReportService.convertJsonToExcel(data);
    const span = trace.getSpan(context.active());
    this.logger.log('yeaahh printed');
    span?.end();
    return asyncData;
  }

  @ApiOkResponse({ description: 'Data extracted from report' })
  @Get(':fileName')
  convertExcelToJson(@Param('fileName') fileName: string) {
    const span = trace.getSpan(context.active());
    this.logger.warn('bro No wait');
    span?.end();
    return this.excelReportService.convertExcelToJson(fileName);
  }
}
