const dayjs = require('dayjs')
export interface paramsType {
    success?: boolean;
    code?: number;
    data?: any;
    time?: String;
    msg?: String;
}
const R = async (obj: paramsType | Promise<any>) => {
    if (obj instanceof Promise) {
        obj = { data: await obj }
    }
    let { success = true, code = 200, data = {}, msg = '成功', time = dayjs().format('YYYY-MM-DD HH:mm:ss') } = obj
    return {
        success, code, msg, time, data: await data
    }
}
R.success = async (data = {}) => {
    return { success: true, code: 200, data: await data, msg: '成功', time: dayjs().format('YYYY-MM-DD HH:mm:ss') }
}
R.error = async (data = {}) => {
    return { success: false, code: 500, data: await data, msg: '失败', time: dayjs().format('YYYY-MM-DD HH:mm:ss') }
}
export default R;
