import { Injectable } from '@nestjs/common';
import { DictsService } from 'src/dicts/dicts.service';

const Excel = require('exceljs');

@Injectable()
export class ExcelService {
  constructor(
    //读写redis
    private readonly dictsService: DictsService,
  ) {}

  async exportExcel(data: any[], metaClass): Promise<Uint8Array> {
    let metaKeys = Reflect.getMetadataKeys(metaClass);
    let dictObj = {};
    let dictColumns = [];
    let columns: Array<Object> = [];
    for await (const item of metaKeys) {
      let meta = Reflect.getMetadata(item, metaClass);
      if (meta.dict) {
        if (!dictObj[meta.dict]) {
          let obj = await this.dictsService.findKey(meta.dict);
          dictObj[meta.dict] = new Map(
            obj.dicts.map((item) => [item.key, item.value]),
          );
        }
        dictColumns.push(meta);
      }
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
    //这里后期再优化
    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      for (let j = 0; j < dictColumns.length; j++) {
        let columns = dictColumns[j];
        let key = columns.key;
        let map = dictObj[columns.dict];
        item[key] = map.get(item[key]);
      }
    }
    sheet.addRows(data);
    // sheet.mergeCells('A2:B2');
    return await workbook.xlsx.writeBuffer();
  }
}
