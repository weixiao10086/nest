import 'reflect-metadata';
import { Response } from '@nestjs/common';
export const Excel = (option): PropertyDecorator => {
  return (target: any, key: any) => {
    Object.assign(option, { key });
    //设置元数据
    Reflect.defineMetadata(`excel-${key}`, option, target.constructor);
  };
};

export const excelResponse = (fileName) => {
  return {
    'Content-Disposition': `attachment; filename=${encodeURIComponent(
      fileName,
    )}`,
    'Content-Type':
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  };
};
