import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { OtelMethodCounter, Span } from 'nestjs-otel';
import { map, Observable } from 'rxjs';
import { ImplementLogger } from 'src/common/decorators/logger.decorator';
import * as XLSX from 'xlsx';
import { LoggerClass } from '../../common/classes/Logger';
import { ReportDto } from '../../dto/report';

@Injectable()
@ImplementLogger
export class ExcelReportService extends LoggerClass {
  constructor(
    // private readonly traceService: TraceService,
    private httpService: HttpService,
  ) {
    super();
  }

  @Span('convert jsonToExcel')
  @OtelMethodCounter()
  convertJsonToExcel(reportData: ReportDto): Observable<AxiosResponse<any>> {
    let data = [];

    if (Array.isArray(reportData)) {
      data = [...data, ...reportData];
    } else {
      data.push(reportData);
    }
    const workSheet = XLSX.utils.json_to_sheet(data);
    const workBook = XLSX.utils.book_new();
    this.logger.debug('workbook created');
    XLSX.utils.book_append_sheet(workBook, workSheet, 'report');
    // Generate buffer
    XLSX.write(workBook, { bookType: 'xlsx', type: 'buffer' });

    // Binary string
    XLSX.write(workBook, { bookType: 'xlsx', type: 'binary' });

    XLSX.writeFile(workBook, 'reportData.xlsx');

    this.logger.log('convert JSON to excel called');

    return this.httpService
      .get('http://localhost:3000/excel-report/reportData')
      .pipe(map((response) => response.data));
  }

  @Span('convert ExcelToJson')
  @OtelMethodCounter()
  convertExcelToJson(fileName: string) {
    const fileNameWithExtension = fileName + '.xlsx';
    const excelJson = XLSX.readFile(fileNameWithExtension);
    const finalData: ReportDto[] = [];
    const sheetName = excelJson.SheetNames[0];
    const sheetNumber = excelJson.Sheets[sheetName]['!ref'];
    const indexLimit = excelJson.Sheets[sheetName]['!ref'].charAt(
      sheetNumber.length - 1,
    );
    for (let i = 2; i <= +indexLimit; i++) {
      const a = 'A' + i;
      const b = 'B' + i;
      const c = 'C' + i;
      const excelObject = new ReportDto();
      excelObject.resourceName = excelJson.Sheets[sheetName][a]['v'];
      excelObject.accountId = excelJson.Sheets[sheetName][b]['v'];
      excelObject.region = excelJson.Sheets[sheetName][c]['v'];
      finalData.push(excelObject);
      this.logger.log(excelObject);
    }

    return finalData;
  }
}
