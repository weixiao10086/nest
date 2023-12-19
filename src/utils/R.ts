//响应函数
import { ForbiddenException } from "./forbidden.exception";
import { Page } from "./page";

/*
 *                        .::::.
 *                      .::::::::.
 *                     :::::::::::
 *                  ..:::::::::::'
 *               '::::::::::::'
 *                 .::::::::::
 *            '::::::::::::::..
 *                 ..::::::::::::.
 *               ``::::::::::::::::
 *                ::::``:::::::::'        .:::.
 *               ::::'   ':::::'       .::::::::.
 *             .::::'      ::::     .:::::::'::::.
 *            .:::'       :::::  .:::::::::' ':::::.
 *           .::'        :::::.:::::::::'      ':::::.
 *          .::'         ::::::::::::::'         ``::::.
 *      ...:::           ::::::::::::'              ``::.
 *     ````':.          ':::::::::'                  ::::..
 *                        '.:::::'                    ':'````..
 *
 */
const dayjs = require('dayjs')
export interface paramsType {
    success?: boolean;
    code?: number;
    data?: any;
    time?: String;
    msg?: String;
}
const R = async (obj: paramsType | Promise<any>, params?: Page):Promise<paramsType> => {
    const { page = 1, size = 10 } = params || {};
    if (obj instanceof Promise || obj instanceof String) {
        obj = { data: await obj }
    }
    let { success = true, code = 200, data = {}, msg = '成功', time = dayjs().format('YYYY-MM-DD HH:mm:ss') } = obj;
    let Robj = { success, code, msg, time, data: await data }
    if (params !== undefined) {
        Robj.data = {
            list: Robj.data[0],
            count: Robj.data[1],
            page: page,
            size: size,
        }
    }
    return Robj
}
R.success = async (data: Object | string = {}):Promise<paramsType> => {
    return { success: true, code: 200, data: await data, msg: '成功', time: dayjs().format('YYYY-MM-DD HH:mm:ss') }
}
R.error = async ({data = {},msg='失败'}):Promise<paramsType> => {
    throw new ForbiddenException({ success: false, code: 500, data, msg, time: dayjs().format('YYYY-MM-DD HH:mm:ss') });
}
export default R;
