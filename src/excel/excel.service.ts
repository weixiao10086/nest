import { Injectable } from '@nestjs/common';
import { DictsService } from 'src/dicts/dicts.service';
const Excel = require('exceljs');
@Injectable()
export class ExcelService {
  constructor(
    //读写redis
    private readonly dictsService: DictsService,
  ) {}
  async exportExcel(data: any[], metaClass): Promise<Buffer> {
    let metaKeys = Reflect.getMetadataKeys(metaClass);
    // let metaKeys = Reflect.getMetadata('excel-name',metaClass);
    console.log(metaKeys);
    let columns: Array<Object> = [];
    for await (const item of metaKeys) {
      let meta = Reflect.getMetadata(item, metaClass);
      columns.push(meta);
    }
    columns.sort((a, b) => {
      return a?.['sort'] - b?.['sort'];
    });
    const workbook = new Excel.Workbook();
    const sheet = workbook.addWorksheet('Sheet1');
    sheet.columns = columns;
    //  [
    //   { header: '姓名', key: 'name', width: 32 },
    //   { header: 'D.O.B.', key: 'DOB', width: 10, outlineLevel: 1 },
    //   { header: 'Id', key: 'id', width: 10 },
    // ];
    console.log(data, 'data');

    sheet.addRows(
      data,
      //   [{
      //   id: 13,
      //   name: 'Thing 1',
      //   dob: new Date()
      // }]
    );
    // sheet.mergeCells('A2:B2');
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
  }
}
