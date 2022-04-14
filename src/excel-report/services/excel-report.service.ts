import { Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';
import { ReportDto } from '../../dto/report';
@Injectable()
export class ExcelReportService {
  convertJsonToExcel(reportData: ReportDto) {
    let data = [];

    if (Array.isArray(reportData)) {
      data = [...data, ...reportData];
    } else {
      data.push(reportData);
    }
    const workSheet = XLSX.utils.json_to_sheet(data);
    const workBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workBook, workSheet, 'report');
    // Generate buffer
    XLSX.write(workBook, { bookType: 'xlsx', type: 'buffer' });

    // Binary string
    XLSX.write(workBook, { bookType: 'xlsx', type: 'binary' });

    // console.log(workBook);

    XLSX.writeFile(workBook, 'reportData.xlsx');
  }

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
    }

    return finalData;
    // return [
    //   {
    //     abcd: '2',
    //   },
    // ];
  }
}
