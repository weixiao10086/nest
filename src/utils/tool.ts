//工具函数


// 转换数据格式
// {                               {
//   dept:{id:1}       <======>       dept:1
// }                               }
export const convertData = (
  data: Object[] | Object | string[] | string,
  NewClass: any,
) => {
  if (data == null) {
    return data;
  } else if (typeof data === 'string') {
    let obj = new NewClass();
    obj.id = data;
    return obj;
  } else if (data instanceof Array) {
    // @ts-ignore
    return data?.map((item) => {
      if (typeof item === 'string') {
        let obj = new NewClass();
        obj.id = item;
        return obj;
      } else {
        return item.id;
      }
    });
  } else if (data instanceof Object) {
    // @ts-ignore
    return data.id;
    // @ts-ignore
  }
};
