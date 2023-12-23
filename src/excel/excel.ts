import 'reflect-metadata';
export const Excel = (option): PropertyDecorator => {
    return (target: any, key: any) => {
        Object.assign(option, { key })
        //设置元数据
        Reflect.defineMetadata(`excel-${key}`, option, target.constructor);
    };
};