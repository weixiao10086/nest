/*
 * @Author: Sheng.Jiang
 * @Date: 2022-01-04 17:52:02
 * @LastEditTime: 2022-09-18 11:07:56
 * @LastEditors: Please set LastEditors
 * @Description: 数据权限装饰器
 * @FilePath: /meimei-admin/src/common/decorators/datascope.decorator.ts
 * You can you up，no can no bb！！
 */

import { SetMetadata } from '@nestjs/common';
// export class DeptOrUserAlias {
//   deptAlias?: string = 'dept';
//   userAlias?: string = 'user';
// }
export const DataScope = () => {
//   const aliaObj = Object.assign(new DeptOrUserAlias(), deptOrUserAlias);
  return SetMetadata('dataScope', true);
};
