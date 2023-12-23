import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from "cache-manager"
import xlsx from 'node-xlsx';

@Injectable()
export class ExcelService {
  constructor(    //读写redis
    @Inject(CACHE_MANAGER) private cacheManager: Cache) {
  }
  exportExcel(metaClass, data) {
    let bufferdata = [[]]
    let metaKeys = Reflect.getMetadataKeys(metaClass)
    let metaArr = []
    for (let i = 0; i < metaKeys.length; i++) {
      let obj = Reflect.getMetadata(metaKeys[i], metaClass)
      if (obj.sort) {
        if (metaArr[obj.sort]) {
          metaArr.splice(obj.sort, 0, obj)
        } else {
          metaArr[obj.sort] = obj
        }
      } else {
        metaArr.push(obj)
      }
    }
    metaArr = metaArr.filter(async item => {
      if (item) {
        bufferdata[0].push(item.name || item.key)
        return true
      } else {
        return false
      }
    })
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      let arr = []
      for (let j = 0; j < metaArr.length; j++) {
        let obj = metaArr[j]
        let key = obj['key']
        if (obj.dict) {
          arr.push(obj.dict)
        } else {
          let value = item[key]
          arr.push(value)
        }
      }
      bufferdata.push(arr)
    }
    let buffer = xlsx.build([
      {
        name: 'sheet',//工作表名
        data: bufferdata,
        options: {}
      }
    ]);
    return buffer;
  }
}
