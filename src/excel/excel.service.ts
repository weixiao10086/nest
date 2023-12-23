import {  Injectable } from '@nestjs/common';
import { DictsService } from 'src/dicts/dicts.service';
import * as xlsx from 'xlsx';
@Injectable()
export class ExcelService {
  constructor(    //读写redis
    private readonly dictsService: DictsService
  ) { }
  async exportExcel(data: any[], fileName: string, metaClass): Promise<Buffer> {
    let metaKeys = Reflect.getMetadataKeys(metaClass)
    let map = new Map();
    let metaArr = [];
    let enHeader = [];
    let zhHeader = []
    for (let i = 0; i < metaKeys.length; i++) {
      let obj = Reflect.getMetadata(metaKeys[i], metaClass)
      if (obj.notexcel) {
        continue;
      }
      if (obj.dict) {
        obj.dictmap = await this.dictsService.initcacheMap(obj.dict)
        map.set(obj.key, obj.dictmap)
      }
      if (obj.sort !== undefined) {
        if (metaArr[obj.sort]) {
          metaArr.splice(obj.sort, 0, obj)
        } else {
          metaArr[obj.sort] = obj
        }
      } else {
        metaArr.push(obj)
      }
    }
    metaArr.forEach(item => {
      if (item) {
        enHeader.push(item.key)
        zhHeader.push(item.name || item.key)
      }
    })
    for (let i = 0; i < data.length; i++) {
      for (const key in data[i]) {
        if (map.has(key)) {
          let map1 = map.get(key)
          data[i][key] = map1.get(data[i][key])
        }
      }
    }
    // const worksheet = xlsx.utils.json_to_sheet(data,{header:['name','id'],"skipHeader":true});
    const worksheet = xlsx.utils.json_to_sheet(data, { header: enHeader });
    // const worksheet = xlsx.utils.aoa_to_sheet(data);
    xlsx.utils.sheet_add_aoa(worksheet, [
      zhHeader
      // ['姓名', 'id']                            //把1写入到B3里面
    ], { origin: "A1" }
    );
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const buffer = xlsx.write(workbook, {
      type: 'buffer',
      bookType: 'xlsx',
    });
    return buffer;
  }
}
